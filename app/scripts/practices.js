/*
    Author:         Gary Kuo
    Date:           May 28, 2014
    Description:    Beacon object sets up the board where Beacon will be displayed and loads up the individual bulbs. TODO: Canvas behind the board.

*/

define([
    'jquery',
    ],
    function ($) {
        var practices;
        //var server = 'http://agnystudio.noip.me:8080';
        var server = 'http://ec2-54-200-253-132.us-west-2.compute.amazonaws.com:8080';
        var defaultColor = 'FF0000';

        function getPractices(callback) {
            if (typeof practices === 'undefined') {
                $.ajax({
                    url: server + '/practices/get',
                    type: 'GET',
                    contentType: 'application/json',
                    crossDomain: true,
                    cache: false,
                    success: function (res, textStatus, xhr) {
                        if (xhr.status === 200) {
                            practices = res;
                            callback(practices);
                        } else {
                            console.log(textStatus);
                        }
                    },
                    error: function (xhr, textStatus, err) {
                        if (xhr.status === 0) {
                            textStatus = 'Connection refused by server. Is the server running? ' + new Date();
                        }
                        console.log(textStatus);
                    }
                });
            } else {
                callback(practices);
            }

        };

        function getPracticeColor(practiceName) {
            if (typeof practices !== 'undefined') {
                for (var i=0; i<practices.length; i++) {
                    if (practices[i].name === practiceName) {
                        return practices[i].color;
                    }
                }
            } else {
                console.log('Call getPractices() first to retrieve the practices from the server. Returning default value: ' + defaultColor);
            }
            return defaultColor;
        };

        return {
            getPractices: getPractices,
            getPracticeColor: getPracticeColor
        }
    }
);