    /**
     * 
     * Start 
     * 
     */

    function Stepper (element){
        let _this             = this;
            this.steps        = element;
            this.currentIndex = 0;
            this.classNames   = { TARGET: 'data-target', CURRENT: 'cm-current', DONE: 'cm-done', ACTIVE: 'active' }

        
        this.setActive = () => {
            let prevContentId = this.steps[this.currentIndex].getAttribute(this.classNames.TARGET);
            let prevContentNode = document.querySelector(prevContentId);
            let contentId = this.steps[this.currentIndex + 1].getAttribute(this.classNames.TARGET);
            let contentNode = document.querySelector(contentId);

            this.steps[this.currentIndex].classList.remove(this.classNames.CURRENT);
            this.steps[this.currentIndex].classList.add(this.classNames.DONE);
            this.steps[this.currentIndex + 1].classList.add(this.classNames.CURRENT);
            prevContentNode.classList.remove(this.classNames.ACTIVE);
            contentNode.classList.add(this.classNames.ACTIVE);
        }

        this.removeActive = () => {
            let prevContentId = this.steps[this.currentIndex].getAttribute(this.classNames.TARGET);
            let prevContentNode = document.querySelector(prevContentId);
            let contentId = this.steps[this.currentIndex - 1].getAttribute(this.classNames.TARGET);
            let contentNode = document.querySelector(contentId);

            this.steps[this.currentIndex].classList.remove(this.classNames.CURRENT);
            this.steps[this.currentIndex].classList.remove(this.classNames.DONE);
            this.steps[this.currentIndex - 1].classList.remove(this.classNames.DONE);
            this.steps[this.currentIndex - 1].classList.add(this.classNames.CURRENT);
            
            prevContentNode.classList.remove(this.classNames.ACTIVE);
            contentNode.classList.add(this.classNames.ACTIVE);
        }

        this.next = () => {
            this.setActive();
            _this.currentIndex = _this.currentIndex + 1;
        }

        this.previous = () => {
            this.removeActive();
            _this.currentIndex = _this.currentIndex - 1;
        }
    }

    /**
     * 
     * User Authenticate
     * 
     */

    function UserAuthenticate () {
        this.firstname = null;
        this.lastname  = null;
        this.email     = null;
        this.password  = null;

        this.auth = () => {
            let formData = {
                login_email   : this.email,
                login_password: this.password,
            }
            httpRequest.post(window.location.origin + '/MedCene/login', formData)
                    .then(result => {
                        if(result.success) {
                            window.location.href = result.payload;
                        } else {
                            let errorHtml = document.querySelector('#error-login');
                            errorHtml.innerHTML = result.message;
                        }
                    }).catch(error => {
                        alert(error);
                    });

        }

        this.register = () => {
            let formData = {
                firstname: this.firstname,
                lastname : this.lastname,
                email    : this.email,
                password : this.password,
            }
            httpRequest.post(window.location.origin + '/MedCene/register', formData)
                    .then(result => {

                    }).catch(error => {
                        alert(error);
                    });
        }
    }

    let loginTrigger = document.querySelector('#loginForm');
        if(loginTrigger != undefined || loginTrigger != null) {
            loginTrigger.addEventListener('submit', (e) => {
                e.preventDefault();

                let user = new UserAuthenticate();
                user.email = document.querySelector('input[name="login_email"]').value;
                user.password = document.querySelector('input[name="login_password"]').value;
                user.auth();
            })
        }
    
    
    /**
     * 
     * Job Post
     * 
     */

    function NextStep() {
        this.currentIndex = 0;
        let element = document.querySelectorAll('.bSteps');
        this.next = () => {
            if(element !== undefined) {
                this.currentIndex = this.currentIndex + 1;

                if(element[this.currentIndex].classList.contains('hide')) {
                    element[this.currentIndex].classList.remove('hide');
                }

                if(!element[this.currentIndex - 1].classList.contains('hide')) {
                    element[this.currentIndex - 1].classList.add('hide');
                }
            }
        }
        this.prev = () => {
            if(element !== undefined) {

                if(!element[this.currentIndex].classList.contains('hide')) {
                    element[this.currentIndex].classList.add('hide');
                }

                if(element[this.currentIndex - 1].classList.contains('hide')) {
                    element[this.currentIndex - 1].classList.remove('hide');
                }

                this.currentIndex = this.currentIndex - 1;
            }
        }
    }