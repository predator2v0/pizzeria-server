const feedbackModel = require('../models/feedback');

/**
 * @param {*} req request object
 * @param {*} res response object
 * @description handles the user feedback. when triggered this controller, it checks for the
 * email if it's present in the db, inserts the feedback in that document otherwise creates
 * another document and inserts the user's feedback as a fresh record.
 */
const userFeedbackController = async (req, res) => {
    try {
        const { email, feedback } = req.body;
        let msg = '';
        if (!email.trim() || !feedback.trim()) {
            res.status(400).json({
                status: 'failure',
                message: 'please fill all the mandatory fields',
            });
        } else {
            const emailExists = await feedbackModel.findOne({ email });
            if (emailExists) {
                const feedbackUpdated = await feedbackModel.updateOne(
                    { email },
                    { $push: { feedback } }
                );
                feedbackUpdated
                    ? (msg = 'feedback updated')
                    : (msg = 'unable to update feedback');
            } else {
                const feedbackInserted = await feedbackModel.create({
                    email,
                    feedback,
                });
                feedbackInserted
                    ? (msg = 'feedback inserted')
                    : (msg = 'unable to insert feedback');
            }
            const feedbackData = {
                email: email,
                feedback: feedback,
            };
            res.status(201).json({
                status: 'success',
                message: msg,
                data: feedbackData,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'failure',
            message: 'internal server error',
        });
    }
};

module.exports = userFeedbackController;
