ForeSee.surveydefs = [{
    name: 'veer-onexit',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later',
        what: 'qualifier'
    },
    qualifier: {
        url: {
            pop: 'qualifying.html'
        },
        width: '500',
        height: '450',
        buttons: {
            accept: 'Continue'
        }
    },
    cancel: {
        url: ['cancel.html']
    },
    criteria: {
        sp: 4,
        lf: 3
    },
    include: {
        urls: ['.']
    }
}];ForeSee.properties = {
    repeatdays: 90,
    
    language: {
        locale: 'en'
    },
    
    exclude: {
        local: [],
        referer: []
    },
    
    invite: {
        url: 'invite.html',
        //content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE><meta http-equiv=\"Content-Type\" content= \"text/html; charset=utf-8\"></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=../game01/www.veer.com/foresee//"{ºseHref%}sitelogo.jpg/" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=../game01/www.veer.com/foresee//"{ºseHref%}sitelogo.gif/" alt=\"Site Logo\"></div></div><div class=\"fsri_body\"><b>Do you like surveys?</b> <br><br>We\'re interested to hear what you think about Veer, the things you love and the things you\'d love to see happen. Our friends at ForeSee Results are conducting a survey for us, independently and confidentially.<br><br>If you are cool with taking the survey, it will pop up when you leave veer.com.<br><br></div></div></BODY></HTML>',
		width: '500',
        bgcolor: '#333',
        opacity: 0.1,
        x: 'center',
        y: 'center',
        delay: 0,
        buttons: {
            accept: 'Sounds good',
            decline: 'No thanks'
        },
        hideOnClick: false,
		css: 'foresee-dhtml.css'
    },
    
    tracker: {
        width: '475',
        height: '275',
        timeout: 3,
        url: 'tracker.html'
    },
    
    survey: {
        width: 550,
        height: 600,
        loading: true
    },
    
    qualifier: {
        location: 'local',
        width: '500',
        height: '450',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        buttons: {
            accept: 'Continue'
        },
        hideOnClick: false,
		css: 'foresee-dhtml.css'
    },
    
    cancel: {
        url: 'cancel.html',
        width: '500',
        height: '300'
    },

    loading: {
        url: 'survey_loading.html'
    },
    
    pop: {
        what: 'survey',
        after: 'leaving-site',
        pu: false,
        tracker: true
    },
    
    mode: 'first-party'
};
