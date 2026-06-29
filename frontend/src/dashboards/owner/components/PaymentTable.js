function PaymentTable({ payments }) {
  return (
    <div className="card shadow p-3">
      <h5>💳 Payments</h5>

      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td>{p.user || "User"}</td>
                <td>₹{p.amount}</td>
                <td>{new Date(p.date).toLocaleDateString()}</td>
                <td>
                  {p.status === "paid"
                    ? "✅ Paid"
                    : "❌ Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PaymentTable;