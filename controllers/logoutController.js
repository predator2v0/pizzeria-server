const logoutController = (req, res) => {
    res.status(200).json({msg: "logout controller working!"})
};

module.exports = logoutController;
