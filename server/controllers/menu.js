import prisma from "../config/prisma_config.js";

const menuController = {
  createMenu: async (req, res) => {
    try {
      const { MenuId, Depth, ParentData, Name } = req.body;
      const existingmenu = await prisma.menu.findFirst({
        where: { Name },
      });

      if (existingmenu) {
        return res.status(400).json({ error: "menu already exists" });
      }

      const menu = await prisma.menu.create({
        data: {
            MenuId, Depth, ParentData, Name
        },
      });

      res.status(200).json(menu);
    } catch (error) {
      console.error({ error: "Failed to create menu" });
      res.status(500).json( error);
    }
  },

  getMenus: async (req, res) => {
    try {
      const menus = await prisma.menu.findMany({});
      if (!menus) {
        return res.status(404).json({ error: "menus not found" });
      }
      res.status(200).json(menus);
    } catch (error) {
      console.error("Error retrieving menus:", error);
      res.status(500).json({ error: error.message });
    }
  },

  getMenuById: async (req, res) => {
    try {
      const { id } = req.params;

      const menu = await prisma.menu.findUnique({ where: { id } });

      if (!menu) {
        return res.status(404).json({ error: "menu not found" });
      }
      res.status(200).json(menu);
    } catch (error) {
      console.error("Error retrieving menu:", error);
      res.status(500).json({ error: "Failed to get the menu" });
    }
  },

  updateMenu: async (req, res) => {
    try {
      const { id } = req.params;
      const { MenuId, Depth, ParentData, Name } = req.body;

      const existingmenu = await prisma.menu.findUnique({
        where: { id },
      });

      if (!existingmenu) {
        return res.status(404).json({ error: "menu not found" });
      }

      const menu = await prisma.menu.update({
        where: { id },
        data: { MenuId, Depth, ParentData, Name },
      });

      res.status(200).json(menu);
    } catch (error) {
      console.error({ error: "Failed to update menu" });
      res.status(500).json({ error: "Failed to update menu" });
    }
  },
  deleteMenu: async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.menu.delete({
        where: {
          id,
        },
      });

      res.json({ message: "menu deleted successfully" });
    } catch (error) {
      console.error("Error deleting menu:", error);
      res.status(500).json({ error: "Failed to delete menu" });
    }
  },
};

export default menuController;
