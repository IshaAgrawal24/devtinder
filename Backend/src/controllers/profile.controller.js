const viewProfile = (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      status_code: 200,
      return_status: true,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      return_status: false,
      return_message: "Internal server error",
    });
  }
};

module.exports = { viewProfile };
