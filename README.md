# Avenue Code UI Challenge - Single #

### Story Phrase ###
* As a curious and sometimes forgetful web surfer, I want to add a simple history feature to this GeoLocation web application, so that I can see all the URLs searched by me on the current session.
* I sometimes use a desktop, sometimes a tablet and sometimes a cell phone, so I need a responsive web page.

### Business Narrative / Scenario ###
* GeoLocation is a working web application which aims to retrieve details about the user's location, as well to point out on a map the physical location of websites from their domain.
* You need to augment Geolocation by providing the history of all the domains typed in by the user, with the most critical info (URL, IP, Country, Latitude, Longitude and Date).
* You have to keep the current features working.

### Functional / Acceptance Criteria ###
* You can choose any approach for the history panel, such as a new page, an overlay, a sidebar...
* Each domain in this history should be a link, which when clicked will ultimately display its location again on the map along with its details.

### Non-Functional / Acceptance Criteria ###
* You can keep track of the information the way you think is best: JS framework, JS array, LocalStorage/SessionStorage, NoSQL database, backend...
* You have to cover all the new code with JS testing using Jasmine.
* Feel free to adopt any web app framework such as Backbone.js, AngularJS, Ember.js, Knockout.js, React.
* You must leverage reusability with the existing code. You might have to refactor some of it, specially when you are adopting a web framework. Make sure to keep the existing functionality up and also to fix any bugs you might run into.
* Don't break existing functionality.

### Delivery Instructions ###
1. You must provide your BitBucket username. A free BitBucket account can be created at http://bitbucket.org
1. The recruiter will give you read permission to a repository named **ui-challenge-single**, at https://bitbucket.org/ac-recruitment/ui-challenge-single
1. You must fork this repository into a private repository on your own account and push your code in there.
1. Once finished, you must give the user **ac-recruitment** read permission on your repository so that you can be evaluated. Then, please contact back your recruiter and he will get an engineer to evaluate your test.
1. After you are evaluated, the recruiter will remove your read permission from the original repository

### Evaluation Criteria ###
1. Functional and non-functional acceptance criteria delivery
1. Code quality: structure, modularization, reuse
1. Code legibility and elegancy
1. Frameworks usage
1. Test coverage
1. Number of bugs

### Comments

the Jasmine folder contains the declaration and usage of jasmine. Open SpecRunner.html to check.