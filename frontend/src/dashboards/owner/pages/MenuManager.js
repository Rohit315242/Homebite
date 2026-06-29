import { useState } from "react";
import MenuForm from "../components/MenuForm";
import MenuList from "../components/MenuList";

function MenuManager() {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [reload, setReload] = useState(0);

  const handleEdit = (menu) => {
    setSelectedMenu(menu);
    window.scrollTo({ top: 0, behavior: "smooth" }); // form vrti scroll
  };

  const handleRefresh = () => {
    setSelectedMenu(null);
    setReload((r) => r + 1);
  };

  return (
    <div style={s.page}>
      <div style={s.container}>
        <h2 style={s.title}>🍽 Menu Manager</h2>

        {/* Add / Edit Menu Form */}
        <div style={s.section}>
          <MenuForm
            selectedMenu={selectedMenu}
            clearSelection={() => setSelectedMenu(null)}
            refresh={handleRefresh}
          />
        </div>

        {/* Menu List */}
        <div style={s.section}>
          <MenuList reload={reload} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
}

const s = {
  page: {
    background: "#0f1117",
    minHeight: "100vh",
    padding: "24px 16px",
  },

  container: {
    maxWidth: 960,
    margin: "0 auto",
  },

  title: {
    color: "#f1f5f9",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    marginTop: 0,
  },

  section: {
    marginBottom: 28,
  },
};

export default MenuManager;