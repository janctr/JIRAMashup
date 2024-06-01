/*
 * Basic reponsive mashup template
 * @owner Jan Iverson Eligio (janiverson.eligio.ctr@us.navy.mil)
 */

/*
 *  Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr(
    0,
    window.location.pathname.toLowerCase().lastIndexOf('/extensions') + 1
);
var config = {
    host: window.location.hostname,
    prefix: prefix,
    port: window.location.port,
    isSecure: window.location.protocol === 'https:',
};

require.config({
    baseUrl:
        (config.isSecure ? 'https://' : 'http://') +
        config.host +
        (config.port ? ':' + config.port : '') +
        config.prefix +
        'resources',
    // paths: {
    //     appControllerModule: '../extensions/JIRAMashup/AppController',
    // },
});

require(['js/qlik'], function (qlik) {
    // Initialize AppController
    // require(['angular', 'appControllerModule'], function (angular) {
    //     console.log('test');
    //     angular.bootstrap(document, ['appControllerModule', 'qlik-angular']);
    // });

    console.log('asdf;akjsdfslkj');

    qlik.setOnError(function (error) {
        $('#popupText').append(error.message + '<br>');
        $('#popup').fadeIn(1000);
    });
    $('#closePopup').click(function () {
        $('#popup').hide();
    });

    /***************************************************/
    /***************************************************/
    /***************************************************/
    /***************************************************/
    /***************************************************/
    /***************************************************/
    /************* CHANGE THESE VARIABLES **************/

    /***************************************************/
    /***************************************************/
    /***************************************************/
    /***************************************************/
    /***************************************************/
    /***************************************************/

    //callbacks -- inserted here --
    //open apps -- inserted here --
    const JiraApp = qlik.openApp(
        '1a7f9a38-c7c2-47ae-b7f0-82dea6bf830a',
        config
    );

    //get objects -- inserted here --
    JiraApp.getObject('gantt-chart', 'nMpQZM', {
        noInteraction: false,
    });

    JiraApp.getObject('print-button', 'knpwAG', {
        noInteraction: false,
    });

    $('#gantt-chart').addClass('loading');

    setInterval(() => {
        const buttonElements = $('#knpwAG_content button');
        const headerElement = $('header#knpwAG_title');
        const ganttChartElement = $('#nMpQZM_content');

        console.log('headerElement: ', headerElement);

        if (ganttChartElement.length) {
            $('#gantt-chart').removeClass('loading');
        }

        if (headerElement.length) {
            headerElement.remove();
        }

        if (
            buttonElements.length &&
            buttonElements.attr('class') !== 'btn btn-dark'
        ) {
            console.log('changing class');
            buttonElements.removeClass();
            buttonElements.addClass('btn btn-dark');
        }
    }, 2500);

    //create cubes and lists -- inserted here --
});
