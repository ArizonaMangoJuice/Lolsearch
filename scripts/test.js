//WIP EVERYTHING IS PRETTY UNSTABLE LIKE IT GIVES ERROS WHEN NOT RANKED PLAYER GET SEARCHED

$(document).ready(function() {
    const API = "RGAPI-1ad2ece7-777d-4e97-9c9d-942e53c7702e";
    $('body').keypress(function(e) {
        var key = e.which;
        if (key == 13) // the enter key code
        {
            $('#search-button').click();

        }
    });

    $("#search-button").click(function() {
        test = $("#user-search").val();
        $(".container-test").empty();
        var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + test + "?api_key=" + API;
        $.ajax({
            type: "GET",
            url: url,
            async: true,
            dataType: "json",
            success: function(json) {
                console.log(test);
                info = json[test].id;
                $(".ranked-info").html(info);
                tierName = "https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/" + info + "/entry?api_key=" + API;
                url2 = "https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/" + info + "/recent?api_key=" + API;
                url4 = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + info + "?api_key=" + API;
                unrankedMatchInfo = "https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/" + info + "/summary?season=SEASON2016&api_key=" + API;
                profileIconImage = "";
                unrankedInfo = "";
                unrankedWins = "";
                unrankedPic = "";
                unrankedIcon = "";
                /*--------Ajax call within ajax call dont know if thats allowed but its pretty sweet like a dream within a dream--------*/
                $.ajax({
                    type: "GET",
                    url: url4,
                    dataType: "json",
                    async: false,
                    success: function(json) {
                        profileIconId = json[info].profileIconId;
                        profileIconImage = "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/profileicon/" + profileIconId + ".png";
                        console.log(profileIconImage);
                        //$(".ranked-info").prepend("<div class='summoner-profile-stuff'><img class='profile-icon-image' src=" + profileIconImage + "></div>");
                    },
                    error: function() {
                        alert("error with profile icon");
                    }
                });
                /*----------------*/
                /*--------Ajax call within ajax call dont know if thats allowed but its pretty sweet like a dream within a dream--------*/
                $.ajax({
                    type: "GET",
                    url: unrankedMatchInfo,
                    dataType: "json",
                    async: false,
                    success: function(json) {
                        unrankedInfo = json.playerStatSummaries[7].playerStatSummaryType;
                        unrankedWins = json.playerStatSummaries[7].wins;
                        unrankedPic = "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/profileicon/" + profileIconId + ".png";
                        unrankedIcon = "http://sk2.op.gg/images/medals/default.png";
                        console.log(unrankedInfo);

                    },
                    error: function() {
                        console.log("the unranked ajax is wrong");
                    }
                });
                /*----------------*/
                /*--------Ajax call within ajax call dont know if thats allowed but its pretty sweet like a dream within a dream--------*/
                $.ajax({
                    type: "GET",
                    url: tierName,
                    async: true,
                    dataType: "json",
                    success: function(json) {

                        rankedName = json[info][0].name;
                        rankedTier = json[info][0].tier;
                        rankedQueue = json[info][0].queue;
                        rankedDivision = json[info][0].entries[0].division;
                        rankedPoints = json[info][0].entries[0].leaguePoints;
                        rankedWins = json[info][0].entries[0].wins;
                        rankedLosses = json[info][0].entries[0].losses;
                        rankedStreak = json[info][0].entries[0].isHotStreak;
                        rankedVeteran = json[info][0].entries[0].isVeteran;
                        rankedFreshBlood = json[info][0].entries[0].isFreshBlood;
                        rankedDivisionNumber = 0;
                        rankedUnderScore = "_";
                        rankedDivisionTier = rankedTier.toLowerCase();
                        if (rankedDivision == "I") {
                            rankedDivisionNumber = 1;
                        } else if (rankedDivision == "II") {
                            rankedDivisionNumber = 2;
                        } else if (rankedDivision == "III") {
                            rankedDivisionNumber = 3;
                        } else if (rankedDivision == "IV") {
                            rankedDivisionNumber = 4;
                        } else if (rankedDivision == "V") {
                            rankedDivisionNumber = 5;
                        }
                        if (rankedName === null || rankedName === undefined) {
                            rankedName = "Unranked";
                        }
                        rankedImage = "http://sk2.op.gg/images/medals/" + rankedDivisionTier + rankedUnderScore + rankedDivisionNumber + ".png ";

                        $(".ranked-info").prepend("<div class='.ranked-info'><div class='ranked-stats '><img class='profile-icon-image' src=" + profileIconImage + "><p>" + rankedName + "</p><p>" + rankedQueue + "</p><p>" + rankedTier + " " + rankedDivision + "</p><p>" + rankedPoints + " LP" + "<p>" + rankedWins + " <span class='cool'>Wins</span> & " + rankedLosses + "<span class='danger' > Losses</span></p>" + "<img class='ranked-image' src=" + rankedImage + "></div></div>");

                        console.log(rankedName);
                    },
                    error: function() {

                        $(".ranked-info").prepend("<div class='.ranked-info'><div class='ranked-stats '><img class='profile-icon-image' src=" + unrankedPic + ">" + "<p>" + unrankedInfo + "</p><p>" + "0" + " LP" + "<p>" + unrankedWins + " <span class='cool'>Wins</span> " + "<img class='ranked-image' src=" + unrankedIcon + "></div></div>");
                    }
                });
                /*----------------*/
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
                            //this url is for the pictures and names of the champs
                            url3 = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + id + "?locale=en_US&champData=image&champData=stats&api_key=" + API;
                            $.ajax({
                                type: "GET",
                                url: url3,
                                async: false,
                                dataType: "json",
                                success: function(json) {
                                    var champion = json.id;
                                    if (champion == id) {
                                        championName = json.key;
                                        imageName = json.image.full;
                                    }
                                },
                                error: function() {
                                    alert("fucked somehting up");
                                }
                            });

                            if (win === true) {
                                win = "<span class='cool'>Victory</span>";
                            } else {
                                win = "<span class='danger'>Defeat</span>";
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
                                "" + kills + "/<span class='danger'>" + deaths + "</span>/" + assists + "</p>" + "<p class='kda'>" + kda + " KDA" + "</p>" + "<p class='largest-kill'>" + "Killing Spree " + largestKill + "</p>" +
                                "<p class='time'>" + time + " minutes" + "</p>" + "<p class='creep-score'>" + cs + " CS" + "</p>" + "<p class='outcome'>" + win + "</p>" + "<img class='champion-pics' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/champion/" + imageName + "'alt=championName><p class='champion-name'>" + championName + "</p>" + "</div>");
                            //$(".container-test").prepend("<p class='border'>" + x[i].playerStatSummaryType + "</p>");
                        }

                    },
                    error: function() {
                        alert("you fucked something up");
                    }
                });
            },
            error: function() {
                alert("please enter a real name");
            }
        });
    });
});