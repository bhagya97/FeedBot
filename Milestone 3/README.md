# FeedBot
### AI-based Feedback Portal System  

For this project, we have used docker containers for better reusability and portability. docker-compose is used to orchestrate these containers.

---

Finished:

* Web Portal with React.js
* Backend with API and Database storage
* Chat Functionality with Sentiment Analysis
* Visualization of parameters based on responses
* Used several cloud services such as database and authentication.

---

Didn't finish:

* Implementation of Feature-rich web-portal
* Various visualization, which can provide the best view of responses
* Machine Learning and Natural Language Processing models tailored for this task.
* Integrate various cloud computing services.

---
* Backend Code Path: `api/app/views.py`
* Front End Path: `feed_bot_app\build`

---
* To run on a local machine:
    * install docker-compose and react
    * open `feed_bot_app/src/constants/urls.js`
        * uncomment first line 
        * comment second line.
    * go to `feed_bot_app` directory.
        * run `npm install` and `npm start`
    * navigate to the directory where `docker-compose.yml` is.
    * run `docker-compose up`.









