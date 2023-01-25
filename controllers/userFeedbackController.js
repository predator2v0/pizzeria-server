const feedbackModel = require("../models/feedback");

const userFeedbackController = async (req, res) => {
    try {
        const email = req.body.email;
        const feedback = req.body.feedback;
        if (!email || !feedback) {
            res.status(400).json({ msg: "please fill all the fields" });
        } else {
            const emailExists = await feedbackModel.findOne({ email });

            if (emailExists) {
                const feedbackUpdated = await feedbackModel.updateOne(
                    { email },
                    { $push: { feedback } }
                );
                feedbackUpdated
                    ? (msg = "feedback updated")
                    : (msg = "unable to update feedback");
            } else {
                const feedbackInserted = await feedbackModel.create({
                    email,
                    feedback,
                });
                feedbackInserted
                    ? (msg = "feedback inserted")
                    : (msg = "unable to insert feedback");
            }
        }
        // !test comment
        console.log(email, feedback, msg);
        res.status(200).json({ email, feedback, msg });
    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "error occured" + err });
    }
};

module.exports = userFeedbackController;
