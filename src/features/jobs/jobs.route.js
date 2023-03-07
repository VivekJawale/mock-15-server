const express = require("express");
require("dotenv").config();
const Job = require('./jobs.model')

const app = express.Router();



app.post('', async (req, res) => {
    try {
        let job = new Job(req.body)
        await job.save();
        return res.status(201).send({ job, msg: "Job created successfully" })
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

app.get('', async (req, res) => {
    let { input, filtlocation, filtcontract } = req.query
    try {
        if (input) {
            let temp = new RegExp(input, "i");
            let jobs = await Job.find({ company_name: temp });
            return res.status(200).send(jobs)
        } else if (filtlocation) {
            let temp = new RegExp(filtlocation, "i");
            let jobs = await Job.find({ location: temp });
            return res.status(200).send(jobs)
        } else if (filtcontract) {
            let temp = new RegExp(filtcontract, "i");
            let jobs = await Job.find({ contract: temp });
            return res.status(200).send(jobs)
        } else {
            let jobs = await Job.find();
            return res.status(200).send(jobs)
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

app.put("/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        let job = await Job.findByIdAndUpdate({ _id: _id }, req.body);
        if (!job) {
            return res.status(404).send({ msg: "Not Found" });
        } else {
            return res.status(204).send({ job, msg: "Succcessfully Updated" })
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
})


app.delete("/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        let job = await Job.findByIdAndDelete({ _id: _id });
        if (!job) {
            return res.status(404).send({ msg: "Not Found" });
        } else {
            return res.status(204).send({ job, msg: "Succcessfully Deleted" })
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
})


module.exports = app;