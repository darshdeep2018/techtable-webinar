const express = require('express');
const bodyParser = require('body-parser');

const pool = require('../models/webinars');

const webinarRouter = express.Router();

webinarRouter.use(bodyParser.json());

webinarRouter.route('/')
.get(async (req,res,next) => {
    try{
        const allwebinars=await pool.query("SELECT * FROM webinar");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(allwebinars.rows);
      } catch (err) {
          next(err);
      }
})
.post(async (req, res, next) => {
    try {
   // const { webinar_id } = req.body.webinar_id;
    const  host_of_webinar=req.body.host_of_webinar;
    const  type_of_webinar =req.body.type_of_webinar;
    const  agenda =req.body.agenda;
    const  registrationLink = req.body.registrationLink;
    const  posting_date =req.body.posting_date;
    const  meeting_id = req.body.meeting_id;
    const  meeting_password = req.body.meeting_password;
    const  platform_for_meeting =req.body.platform_for_meeting;
    const newWebinar = await pool.query(
      "INSERT INTO webinar(host_of_webinar ,type_of_webinar ,agenda ,registration_link ,posting_date ,meeting_id ,meeting_password,platform_for_meeting) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [host_of_webinar,type_of_webinar,agenda,registrationLink,posting_date,meeting_id,meeting_password,platform_for_meeting]
    );
    console.log('webinar Created ', newWebinar);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(newWebinar);
    } catch (err) {
        next(err);
    }
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /webinars');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('Delete operation not supported on /webinars');
});

webinarRouter.route('/:webinarId')
.get(async (req,res,next) => {
    try {
        const  id  = req.params.webinarId;
        const webinar = await pool.query("SELECT * FROM webinar WHERE webinar_id = $1", [
          id
        ]);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(webinar.rows[0]);
      } catch (err) {
        console.error(err.message);
        next(err);
      }
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /webinar/'+ req.params.webinarId);
})
.put(async(req, res, next) => {
    try {
      const id = req.params.webinarId;
      const  host_of_webinar=req.body.host_of_webinar;
      const  type_of_webinar =req.body.type_of_webinar;
      const  agenda =req.body.agenda;
      const  registrationLink = req.body.registrationLink;
      const  posting_date =req.body.posting_date;
      const  meeting_id = req.body.meeting_id;
      const  meeting_password = req.body.meeting_password;
      const  platform_for_meeting =req.body.platform_for_meeting;
      
      const updateWebinar = await pool.query(
        "UPDATE webinar SET host_of_webinar=$2 ,type_of_webinar=$3 ,agenda=$4 ,registration_link=$5 ,posting_date=$6 ,meeting_id=$7 ,meeting_password =$8,platform_for_meeting=$9 WHERE webinar_id = $1",
        [id,host_of_webinar,type_of_webinar,agenda,registrationLink,posting_date,meeting_id,meeting_password,platform_for_meeting]
      );
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(updateWebinar);
    } catch (err) {
      console.error(err.message);
      next(err);
    }
})
.delete(async (req, res, next) => {
    try {
        const  id  = req.params.webinarId;
        const deleteWebinar = await pool.query("DELETE FROM webinar WHERE webinar_id = $1", [
          id
        ]);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json("row deleted successfully");
      } catch (err) {
        console.log(err.message);
        next(err);
      }
});

webinarRouter.route('/recommendations')
.get(async (req,res,next) => {
  try {  
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.send('recommendations');
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

webinarRouter.route('/contactus')
.get(async (req,res,next) => {
try {  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.send('contactus');
} catch (err) {
  console.log(err.message);
  next(err);
}
});

webinarRouter.route('/signup')
.get(async (req,res,next) => {
  try {  
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.send('signup');
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

module.exports = webinarRouter;