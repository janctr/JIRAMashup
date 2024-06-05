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
    qlik.setOnError(function (error) {
        $('#popupText').append(error.message + '<br>');
        $('#popup').fadeIn(1000);
    });
    $('#closePopup').click(function () {
        $('#popup').hide();
    });

    /* Insert loaders */
    // const loader = $(`
    //     <svg version="1.1" id="L1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    //         x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"
    //         style="background-color: inherit; margin: 0 auto; width: 100px; height: 100px;">
    //         <circle fill="none" stroke="#203a43" stroke-width="6" stroke-miterlimit="15"
    //             stroke-dasharray="14.2472,14.2472" cx="50" cy="50" r="47">
    //             <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="5s"
    //                 from="0 50 50" to="360 50 50" repeatCount="indefinite" />
    //         </circle>
    //         <circle fill="none" stroke="#203a43" stroke-width="1" stroke-miterlimit="10"
    //             stroke-dasharray="10,10" cx="50" cy="50" r="39">
    //             <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="5s"
    //                 from="0 50 50" to="-360 50 50" repeatCount="indefinite" />
    //         </circle>
    //         <g fill="#203a43">
    //             <rect x="30" y="35" width="5" height="30">
    //                 <animateTransform attributeName="transform" dur="1s" type="translate"
    //                     values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.1" />
    //             </rect>
    //             <rect x="40" y="35" width="5" height="30">
    //                 <animateTransform attributeName="transform" dur="1s" type="translate"
    //                     values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.2" />
    //             </rect>
    //             <rect x="50" y="35" width="5" height="30">
    //                 <animateTransform attributeName="transform" dur="1s" type="translate"
    //                     values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.3" />
    //             </rect>
    //             <rect x="60" y="35" width="5" height="30">
    //                 <animateTransform attributeName="transform" dur="1s" type="translate"
    //                     values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.4" />
    //             </rect>
    //             <rect x="70" y="35" width="5" height="30">
    //                 <animateTransform attributeName="transform" dur="1s" type="translate"
    //                     values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.5" />
    //             </rect>
    //         </g>
    //     </svg>
    // `);

    // $(document).ready(() => {
    //     for (const elementId of [
    //         'gantt-chart',
    //         'update-table',
    //         'apps-in-development-kpi',
    //         'apps-in-ioc-kpi',
    //     ]) {
    //         $(`#${elementId}`).append(loader);
    //     }
    // });

    /******************/

    //open apps -- inserted here --
    const JiraApp = qlik.openApp(
        '1a7f9a38-c7c2-47ae-b7f0-82dea6bf830a',
        config
    );

    //get objects -- inserted here --
    JiraApp.getObject('gantt-chart', 'nMpQZM', {
        noInteraction: false,
    });

    JiraApp.getObject('update-table', '74bba754-a43f-47bb-902f-f4f645aace1c', {
        noInteraction: false,
    });

    JiraApp.getObject('print-button', 'xrwamkt', {
        noInteraction: false,
    });

    JiraApp.getObject(
        'apps-in-development-kpi',
        '831ebd2f-4fd0-49b7-b827-5b80182b67a3',
        {
            noInteraction: false,
        }
    );

    JiraApp.getObject(
        'apps-in-ioc-kpi',
        '253c0677-a625-4fc9-8f34-3645e209692f',
        {
            noInteraction: false,
        }
    );

    $('#gantt-chart').addClass('loading');
    $('#update-table').addClass('loading');
    $('#apps-in-development-kpi').addClass('loading');
    $('#apps-in-ioc-kpi').addClass('loading');

    setInterval(() => {
        const buttonElements = $('#xrwamkt_content button');
        const printButtonHeaderElement = $('header#xrwamkt_title');

        /* These containers have loaders */
        const ganttChartElement = $('#nMpQZM_content');
        const updateTableElement = $(
            '#74bba754-a43f-47bb-902f-f4f645aace1c_content'
        );
        const appsInDevelopmentKpiElemenet = $(
            '#831ebd2f-4fd0-49b7-b827-5b80182b67a3_content'
        );
        const appsInIocKpiElemenet = $(
            '#253c0677-a625-4fc9-8f34-3645e209692f_content'
        );
        /*********************************/

        /* Remove loaders once elements has finished loading */
        if (ganttChartElement.length) {
            $('#gantt-chart').removeClass('loading');
        }

        if (updateTableElement.length) {
            $('#update-table').removeClass('loading');
        }

        if (appsInDevelopmentKpiElemenet.length) {
            $('#apps-in-development-kpi').removeClass('loading');
        }

        if (appsInIocKpiElemenet.length) {
            $('#apps-in-ioc-kpi').removeClass('loading');
        }
        /*********************************************/

        /* Style Export to PDF button */
        if (printButtonHeaderElement.length) {
            printButtonHeaderElement.remove();
        }

        if (
            buttonElements.length &&
            buttonElements.attr('class') !== 'btn btn-dark'
        ) {
            console.log('changing class');
            buttonElements.removeClass();
            buttonElements.addClass('btn btn-dark');
        }
        /***************************/
    }, 2500);

    //create cubes and lists -- inserted here --
});
