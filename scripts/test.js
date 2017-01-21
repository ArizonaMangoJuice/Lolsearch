$(document).ready(function() {
    $("#search-button").click(function() {
        test = $("#user-search").val();
        var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + test + "?api_key=RGAPI-c99b18d9-2a9d-43a4-8b94-29942275b32d";
        console.log(test);
        $.ajax({
            type: "GET",
            url: url,
            async: false,
            dataType: "json",
            success: function(json) {
                $(".info").html("");
                var test2 = test;
                console.log(test2);
                info = json[test].id;
                $(".info").html(info);
                console.log(info);
            },
            error: function() {
                alert("you fucked something up");
            }
        });
        var url2 = "https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/" + info + "/recent?api_key=RGAPI-c99b18d9-2a9d-43a4-8b94-29942275b32d";

        $.ajax({
            type: "GET",
            url: url2,
            async: false,
            dataType: "json",
            success: function(json) {
                x = json.games.reverse();
                for (var i = 0; i < x.length; i++) {
                    // this shows the kills 
                    var kills = x[i].stats.championsKilled;
                    //this shows the deaths
                    var deaths = x[i].stats.numDeaths;
                    //this shows the assists
                    var assists = x[i].stats.assists;
                    //this shows the largest kills the person had in the game
                    var largestKill = x[i].stats.largestKillingSpree;
                    //this is the time in seconds
                    var timeInSeconds = x[i].stats.timePlayed;
                    //this is the time in minutes
                    var time = (timeInSeconds / 60).toFixed(0);
                    //this is the minions killed in match
                    var minions = x[i].stats.minionsKilled;
                    //this is the monsters killed in match
                    var monsters = x[i].stats.neutralMinionsKilled;
                    // this is the total cs
                    var cs = minions + monsters;
                    //this is for the win or loss
                    var win = x[i].stats.win;
                    //this is the kda it still needs some work for kda's Showing NaN
                    var kda = ((x[i].stats.championsKilled + x[i].stats.assists) / x[i].stats.numDeaths).toFixed(2);
                    //this is the champion id
                    id = x[i].championId;
                    var url3 = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + id + "?locale=en_US&champData=stats&api_key=RGAPI-c99b18d9-2a9d-43a4-8b94-29942275b32d"

                    $.ajax({
                        type: "GET",
                        url: url3,
                        async: false,
                        dataType: "json",
                        success: function(json) {
                            var champion = json.id;
                            if (champion == id) {
                                championName = json.key;
                            }
                        },
                        error: function() {
                            alert("fucked somehting up");
                        }
                    });

                    if (win === true) {
                        win = "Victory";
                    } else {
                        win = "Defeat";
                    }
                    if (monsters === NaN || monsters === undefined) {
                        cs = minions;
                    } else if (minions === undefined || minions === undefined) {
                        monsters = cs;
                    }
                    if (kills === undefined) {
                        kills = 0;
                    } else if (deaths === undefined) {
                        deaths = 0;
                    }
                    //this removes any numDeaths that retun NaN
                    if (x[i].stats.numDeaths === 0 || x[i].stats.numDeaths === NaN || x[i].stats.numDeaths === undefined) {

                        kda = x[i].stats.championsKilled + x[i].stats.assists;
                        //this removes any assists that retun NaN
                    } else if (x[i].stats.assists === 0 || x[i].stats.assists === NaN || x[i].stats.assists === undefined) {

                        kda = x[i].stats.championsKilled / x[i].stats.numDeaths;
                        //this removes any championsKilled that retun NaN
                    } else if (x[i].stats.championsKilled === 0 || x[i].stats.championsKilled === NaN || x[i].stats.championsKilled === undefined) {

                        kda = (x[i].stats.assists / x[i].stats.numDeaths).toFixed(2);
                    }

                    //if largestKill kill returns undefined make it 0
                    if (largestKill === undefined) {
                        largestKill = "0";
                    }

                    //console.log(x[i]);

                    //$(".info2").prepend("<li><a href= " + x[i].playerStatSummaryType + ">" + x[i].wins + "</a><p>" + x[i].playerStatSummaryType + "</p><li>")
                    $(".container-test").prepend("<div class='container-to-hold'><p class='border name-of-game'>" + x[i].subType + "</p><p class='stats'>" +
                        "" + kills + "/" + deaths + "/" + assists + "</p>" + "<p class='kda'>" + kda + " KDA" + "</p>" + "<p class='largest-kill'>" + "Killing Spree " + largestKill + "</p>" +
                        "<p class='time'>" + time + " minutes" + "</p>" + "<p class='creep-score'>" + cs + " CS" + "</p>" + "<p class='outcome'>" + win + "</p>" + "<p class='champion-name'>" + championName + "</p>" + "</div>");
                    //$(".container-test").prepend("<p class='border'>" + x[i].playerStatSummaryType + "</p>");
                }

            },
            error: function() {
                alert("you fucked something up");
            }
        });

    });

});


/*

                    if (id === champs) {

                    }
                    var championTest; 
                            var url3 = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/+id+?locale=en_US&champData=stats&api_key=RGAPI-c99b18d9-2a9d-43a4-8b94-29942275b32d"
        $.ajax({
            type: "GET",
            url: url3,
            async: false,
            dataType: "json",
            success: function(json) {
                if()
            },
            error: function() {
                alert("fucked somehting up");
            }
        });
*/