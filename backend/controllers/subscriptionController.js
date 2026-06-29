const Subscription = require("../models/Subscription");
const Mess = require("../models/Mess");
const User = require("../models/User");


// Subscribe


exports.subscribe = async (req, res) => {

    try {

        const { messId } = req.body;

        let sub = await Subscription.findOne({
            user: req.user.id,
            mess: messId,
        });

        if (sub) {

            sub.status = "active";
            sub.startDate = new Date(); // ← FIX 1: re-subscribe la startDate reset
            await sub.save();

            return res.json(sub);

        }

        sub = await Subscription.create({

            user: req.user.id,

            mess: messId,

            plan: "monthly",

            status: "active",

            startDate: new Date(), // ← FIX 1: navin subscription la startDate set

        });

        res.json(sub);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};


// Cancel


exports.cancelSubscription = async (req, res) => {

    try {

        const { messId } = req.body;

        await Subscription.findOneAndUpdate(

            {
                user: req.user.id,
                mess: messId,
            },

            {
                status: "expired",
            }

        );

        res.json({
            message: "Subscription Cancelled"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};


// User Subscription


exports.getUserSubscriptions = async (req, res) => {

    try {

        const subs = await Subscription.find({

            user: req.user.id,

            status: "active", // ← FIX 2: fakt active subscriptions return kar

        }).populate("mess");

        res.json(subs);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};


// Check Status


exports.checkSubscription = async (req, res) => {

    try {

        const sub = await Subscription.findOne({

            user: req.user.id,

            mess: req.params.messId,

            status: "active",

        });

        res.json({

            subscribed: !!sub

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};


// Owner Members


exports.getOwnerMembers = async (req, res) => {

    try {

        const mess = await Mess.findOne({

            owner: req.user.id,

        });

        if (!mess) {

            return res.json([]);

        }

        const members = await Subscription.find({

            mess: mess._id,

            status: "active",

        })
        .populate("user", "name email")
        .sort({ createdAt: -1 });

        res.json(members);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};