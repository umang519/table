import { useState } from "react";
import { AppBar, List, ListItem, ListItemText, Toolbar, Box, Button, TextField, InputAdornment, Menu, MenuItem, Grid, Typography, Drawer, IconButton, Container, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReactCountryFlag from "react-country-flag";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuType, setMenuType] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);


    const isMobile = useMediaQuery("(max-width:900px)");

    const handleHover = (event, type) => {
        setAnchorEl(event.currentTarget);
        setMenuType(type);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setMenuType("");
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const categories = ["Dog", "Cat", "Other Animals", "Pharmacy", "Services", "Give Back"];

    const defaultMenuItems = {
        Food: [
            "Dry Food",
            "Wet Food",
            "Fresh Food & Toppers",
            "Veterinary Diets",
            "Shop by Health Condition",
            "Puppy Food",
        ],
        Treats: [
            "Bones & Bully Sticks",
            "Soft & Chewy Treats",
            "Dental Treats",
            "Biscuits & Cookies",
            "Jerky Treats",
            "Freeze-Dried & Dehydrated",
            "Training Treats",
        ],
        Toys: [
            "Chew Toys",
            "Plush Toys",
            "Interactive Toys",
            "Fetch Toys",
            "Rope & Tug Toys",
            "Tough Chewer",
            "Variety Packs",
        ],
        Supplies: [
            "Crates, Pens & Gates",
            "Beds",
            "Bowls & Feeders",
            "Grooming",
            "Cleaning & Potty",
            "Carriers & Travel",
            "Training & Behavior",
            "Dog Tech & Smart Home",
        ],
        "Collars & Leashes": ["Collars", "Harnesses", "Leashes"],
        Clothing: ["Coats & Jackets", "Sweaters & Hoodies", "Shirts"],
        "Health & Pharmacy": [
            "Flea & Tick",
            "Vitamins & Supplements",
            "Heartworm & Dewormers",
            "Pharmacy & Prescriptions",
            "DNA Testing Kits",
        ],
    };

    const menuItems = {
        Dog: defaultMenuItems,
        Cat: defaultMenuItems,
        "Other Animals": defaultMenuItems,
        Pharmacy: defaultMenuItems,
        Services: defaultMenuItems,
        "Give Back": defaultMenuItems,

    };



    return (

        <Box>
<Container maxWidth= "2xl" disableGutters = "true" sx={{ backgroundColor: "#1C49C2"}}>
<Container maxWidth= "xl" disableGutters = "true">
            <AppBar position="static" sx={{ backgroundColor: "#1C49C2", color: "#fff", height: { xs: "auto", md: "10px 20px" }, maxWidth: "100vw", padding: { xs: "10px 10px", md: "10px 20px" } }}>
            

                <Toolbar sx={{
                    minHeight: 64, display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    flexWrap: "nowrap"
                }}>

                    <Box>
                        <Box sx={{ display: "flex" }}>

                            {/* ✅ Mobile: Hamburger Menu Button */}
                            {isMobile ? (
                                <IconButton onClick={toggleDrawer(true)} color="inherit">
                                    <MenuIcon />
                                </IconButton>
                            ) : null}

                            {/* Logo */}

                            {isMobile ? (
                                <Box sx = {{ display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                position: "absolute",
                                left: 0,
                                top: 0 }} >
                                    <img src="/images/Screenshot 2025-02-05 172654.png" alt="Logo" style={{ height: 50 , width: "150px"}} />
                                </Box>)

                                :

                                (<Box component="a" href="#" sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit", mr: 2 }}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" padding={1}>
                                        <img src="/images/Screenshot 2025-02-05 172654.png" alt="Logo" style={{ height: 50 }} />
                                    </Box>
                                </Box>)}


                            {/* Search Bar */}
                            {!isMobile && (
                                <Box padding={1} sx={{ flexGrow: 1, width: { xs: "100%", md: "60%" }, mr: { md: 1 }, mb: { xs: 1, md: 0 } }}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="Search"
                                        InputProps={{
                                            sx: { backgroundColor: "#fff", borderRadius: "5px" },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                            )}

                        </Box>

                        <Box px={1} py = {2} sx={{ width: "90vw", flexGrow: "1",display: {md: "none",} }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                placeholder="Search"
                                InputProps={{
                                    sx: { backgroundColor: "#fff", borderRadius: "5px", },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Navigation Buttons */}

                    {!isMobile && (
                        <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" }, alignItems: "center", gap: { xs: 1, md: 2 } }}>
                            <Button
                                color="inherit"
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    textTransform: "none",
                                    ml: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5
                                }}>
                                <ReactCountryFlag countryCode="US" svg style={{ width: "1.5em", height: "1.5em", marginLeft: 4 }} />
                                USA
                                <ExpandMoreIcon fontSize="small" sx={{ ml: 0.5 }} />
                            </Button>
                            <Button
                                color="inherit"
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    textTransform: "none",
                                    ml: 10,
                                    border: "4px solid #ffffff",
                                    borderRadius: 4,
                                    px: 1,
                                    whiteSpace: "nowrap",
                                    minWidth: "100px",
                                    padding: "6px 12px",
                                    border: "2px solid #ffffff",
                                }}>
                                Use App
                            </Button>
                            <Button
                                color="inherit"
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    textTransform: "none",
                                    ml: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    whiteSpace: "nowrap",
                                    minWidth: "120px",
                                    padding: "6px 12px",
                                }}>
                                <MessageIcon sx={{ mr: 0.5 }} />
                                24/7 Help
                                <ExpandMoreIcon fontSize="small" sx={{ ml: 0.5 }} />
                            </Button>
                            <Button
                                color="inherit"
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    textTransform: "none",
                                    ml: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    whiteSpace: "nowrap",
                                    minWidth: "100px",
                                    padding: "6px 12px",
                                }}>
                                <PersonIcon sx={{ mr: 0.5 }} />
                                Sign In
                                <ExpandMoreIcon fontSize="small" sx={{ ml: 0.5 }} />
                            </Button>
                            <Button color="inherit" sx={{ fontSize: "14px", fontWeight: "600", textTransform: "none", display: "flex", alignItems: "center" }}>
                                <ShoppingCartIcon sx={{ ml: 10 }} />
                                Cart
                                <ExpandMoreIcon fontSize="small" sx={{ ml: 0.5 }} />
                            </Button>
                        </Box>
                    )}
                </Toolbar>
                {/* Bottom Header - Categories */}



                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    <List sx={{ width: 250 }}>
                        {categories.map((text) => (
                            <ListItem button key={text} onClick={toggleDrawer(false)}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>

                {!isMobile && (
                    <Toolbar sx={{ minHeight: 90, justifyContent: "space-between", display: "flex", width: "100%", }} >
                        {categories.map((item) => (
                            <Box key={item} sx={{ position: "relative" }} onMouseEnter={(e) => handleHover(e, item)} onMouseLeave={handleClose}>
                                <Button color="inherit" sx={{ textTransform: "none", fontWeight: "bold", "&:hover": { backgroundColor: "#173A91" } }}>
                                    {item}
                                    <ExpandMoreIcon fontSize="medium" sx={{ ml: 0.5 }} />
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl) && menuType === item}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        onMouseLeave: handleClose,
                                        sx: { fontSize: "12px" },
                                    }}
                                    PaperProps={{ sx: { width: "150vw", fontSize: "12px", minWidth: "400px" } }}
                                    sx={{ mt: 1 }}
                                >
                                    <Grid container spacing={2} sx={{ padding: 2 }}>
                                        {Object.keys(menuItems[item] || {}).map((category) => (
                                            <Grid item xs={3} key={category}>
                                                <Typography sx={{ fontWeight: "bold", mb: 1, fontSize: "12px" }}>{category} &gt;</Typography>
                                                {menuItems[item][category].map((sub) => (
                                                    <MenuItem key={sub} onClick={handleClose} sx={{ fontSize: "12px" }}>
                                                        {sub}
                                                    </MenuItem>
                                                ))}
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Menu>
                            </Box>
                        ))}

                        <Button color="inherit" sx={{ textTransform: "none", fontWeight: "bold", "&:hover": { backgroundColor: "#173A91" } }}>
                            Today's Deals
                        </Button>

                        <Typography sx={{ fontWeight: "bold", fontSize: 14, color: "#FFC80C", mr: "10px" }}>
                            Free delivery on first-time orders over $49
                        </Typography>
                    </Toolbar>
                )}
                
            </AppBar>
            </Container>
            </Container>
            <Box>
                <Box display="flex" justifyContent="center" alignItems="center" my={2}>
                    <Typography variant="h5" align="center" color="#000000"
                        fontWeight="600" fontSize="16px">
                        $20 eGift card with $49+ on 1st order* Use WELCOME
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
