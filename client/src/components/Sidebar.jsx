import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AddCardIcon from '@mui/icons-material/AddCard';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { useSelector } from "react-redux";
import ThreePIcon from '@mui/icons-material/ThreeP';





const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Client Facing",
      icon: null,
    },
    {
      text: "Clients",
      icon: <Groups2Outlined />,
    },
    {
      text: "Virements",
      icon: <CurrencyExchangeIcon />,
    },
    {
      text: "Chequier",
      icon: <ReceiptLongOutlined />,
    },
    {
      text: "Credits",
      icon: <AddBusinessIcon />,
    },
    {
      text: "Cards",
      icon: <CreditCardIcon />,
    },
    {
      text: "Calendrier",
      icon: null,
    },
    
    
    // {
    //   text: "Admin",
    //   icon: null,
    // },
    // {
    //   text: "Overview",
    //   icon: <PointOfSaleOutlined />,
    // },
    // {
    //   text: "Daily",
    //   icon: <TodayOutlined />,
    // },
    {
      text: "Calendar",
      icon: <CalendarMonthOutlined />,
    },
    // {
    //   text: "Breakdown",
    //   icon: <PieChartOutlined />,
    // },
    {
      text: "Chat",
      icon: null,
    },
    {
      text: "Chat",
      icon: <ThreePIcon />,
    },
    
    ...(user?.role === "user"
    ? []
    : [
        {
          text: "User Management",
          icon: null,
        },
        {
          text: "Users",
          icon: <AdminPanelSettingsOutlined />,
        },
      ]),,
    // {
    //   text: "Performance",
    //   icon: <TrendingUpOutlined />,
    // },
  ];
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const role = user?.role;
  console.log("🚀 ~ file: Sidebar.jsx:114 ~ role:", role);
  
  // Provide a default value for isAdmin if the user object is not available
  const isAdmin = role?.includes("superadmin") || false;
  console.log("🚀 ~ file: Sidebar.jsx:116 ~ isAdmin:", isAdmin);
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                  Tableau de bord pour We Bank 
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        // Add specific handler for "Admin" item navigation
                        if (lcText === "admin" && !isAdmin) {
                          // Redirect to some unauthorized page or show a message
                          // if the user doesn't have the "superadmin" role.
                          console.log("You don't have access to Admin!");
                        } else {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                        }
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          

        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
