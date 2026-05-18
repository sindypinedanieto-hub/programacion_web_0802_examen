import { Box, Toolbar, useTheme, useMediaQuery } from "@mui/material"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { drawerWidth, collapsedWidth } from "./constants"
import { useState } from "react"

export default function MainLayout({ children }) {

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [open, setOpen] = useState(true)
  const [collapsed, setCollapsed] = useState(false)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const sidebarWidth = collapsed ? collapsedWidth : drawerWidth
  const footerHeight = 56

  return (
    <Box sx={{ display: "flex" }}>

      <Navbar toggleDrawer={toggleDrawer} toggleCollapse={toggleCollapse} />

      <Sidebar
        open={open}
        collapsed={collapsed}
        isMobile={isMobile}
        onClose={toggleDrawer}
      />

    <Box
        component="main"
        sx={{
            flexGrow: 1,
        p: { xs: 2, md: 3, lg: 4 },
        pb: { xs: `${footerHeight + 16}px`, md: `${footerHeight + 24}px` },
            transition: "all 0.3s"
        }}
    >

      
        <Toolbar />
        {children}
      </Box>

      {/* Footer fijo siempre visible */}
      <Box
        component="footer"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: isMobile ? 0 : `${sidebarWidth}px`,
          right: 0,
          height: footerHeight,
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          zIndex: theme.zIndex.appBar - 1
        }}
      >
        <Box component="span" sx={{ color: 'text.secondary', fontSize: 14 }}>
          © {new Date().getFullYear()} Sindy Pineda Nieto — Todos los derechos reservados - Programación Web
        </Box>
      </Box>

    </Box>
  )
}