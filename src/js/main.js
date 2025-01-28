// -----------------------------------------------------------------------------
// 「popup.html」表示時に発火する'DOMContentLoaded'イベントリスナーの設定
// -----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded",
    function () {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true
            },
            function (tabs) {
                try {
                    document.getElementById("dateTimeLabel").innerText = new Date().toLocaleString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"});
                    var currentTab = tabs[0];
                    if (currentTab && currentTab.url) {
                        // Site info
                        document.getElementById("titleLabel").innerHTML = currentTab.title;
                        document.getElementById("urlLabel").innerText = currentTab.url;
                        document.getElementById("urlDecodeLabel").innerText = decodeUnicode(currentTab.url);
                        // Device info
                        document.getElementById("deviceLabel").innerText = getDeviceInfo();
                        document.getElementById("osLabel").innerText = getOSInfo();
                        document.getElementById("browserLabel").innerText = getBrowserInfo();
                        document.getElementById("cookieEnableLabel").innerText = checkCookieEnable() ? "Enable" : "Disable";
                        document.getElementById("languageLabel").innerText = navigator.language;
                        document.getElementById("screenLabel").innerText = screen.width + " x " + screen.height;
                        document.getElementById("outerSizeLabel").innerText = document.documentElement.clientWidth + " x " + document.documentElement.clientHeight;
                        document.getElementById("innerSizeLabel").innerText = window.innerWidth + " x " + window.innerHeight;
                        document.getElementById("userAgentLabel").innerText = navigator.userAgent;
                        captureTab();
                    } else {
                        console.error("無効なタブ、または、URLプロパティが見つかりません。");
                    }
                } catch (err) {
                    document.getElementById("status").innerText = "申し訳ありません。\r\nloadTabInfoでエラーが発生しました。\r\n" + err.message;
                    console.error("decodeURIComponent ERROR:", err);
                }
            });
        document
            .getElementById("exportButton")
            .addEventListener("click", exportReportFile);
    }
);

// -----------------------------------------------------------------------------
// デバイス情報を調べる
// -----------------------------------------------------------------------------
function getDeviceInfo() {
    const userAgentStr = navigator.userAgent.toLowerCase();
    var result = "PC";
    if (userAgentStr.includes("iphone")) {
        result = "iPhone";
    } else if (userAgentStr.includes("ipad")) {
        result = "iPad";
    } else if (userAgentStr.includes("android")) {
        if (userAgentStr.includes("mobile")) {
            result = "Android Mobile";
        } else {
            result = "Android Tablet";
        }
    }
    return result;
}

// -----------------------------------------------------------------------------
// OS情報を調べる
// -----------------------------------------------------------------------------
function getOSInfo() {
    const userAgentStr = navigator.userAgent.toLowerCase();
    var result = "";
    if (userAgentStr.includes("windows phone")) {
        result = "Windows Phone";
    } else if (userAgentStr.includes("windows")) {
        if (userAgentStr.includes("nt 5.1")) {
            result = "Windows XP 32bit";
        } else if (userAgentStr.includes("nt 5.2")) {
            result = "Windows XP 64bit, Server 2003";
        } else if (userAgentStr.includes("nt 6.0")) {
            result = "Windows Vista, Server 2008";
        } else if (userAgentStr.includes("nt 6.1")) {
            result = "Windows 7, Server 2008 R2";
        } else if (userAgentStr.includes("nt 6.2")) {
            result = "Windows 8, Server 2012";
        } else if (userAgentStr.includes("nt 6.3")) {
            result = "Windows 8.1, Server 2012 R2";
        } else if (userAgentStr.includes("nt 10.0")) {
            result = "Windows 10, 11, Server 2016, Server 2019, Server 2022";
        } else {
            result = "Windows";
        }
    } else if (userAgentStr.includes("iphone os")) {
        result = "iOS";
    } else if (userAgentStr.includes("mac os")) {
        result = "Mac OS X";
        if (userAgentStr.includes("x 10.5") || userAgentStr.includes("x 10_5")) {
            result += " 10.5 Leopard";
        } else if (userAgentStr.includes("x 10.6") || userAgentStr.includes("x 10_6")) {
            result += " 10.6 Snow Leopard";
        } else if (userAgentStr.includes("x 10.7") || userAgentStr.includes("x 10_7")) {
            result += " 10.7 Lion";
        } else if (userAgentStr.includes("x 10.8") || userAgentStr.includes("x 10_8")) {
            result += " 10.8 Mountain Lion";
        } else if (userAgentStr.includes("x 10.9") || userAgentStr.includes("x 10_9")) {
            result += " 10.9 Mavericks";
        } else if (userAgentStr.includes("x 10.10") || userAgentStr.includes("x 10_10")) {
            result += " 10.10 Yosemite";
        } else if (userAgentStr.includes("x 10.11") || userAgentStr.includes("x 10_11")) {
            result += " 10.11 El Capitan";
        } else if (userAgentStr.includes("x 10.12") || userAgentStr.includes("x 10_12")) {
            result += " 10.12 Sierra";
        } else if (userAgentStr.includes("x 10.13") || userAgentStr.includes("x 10_13")) {
            result += " 10.13 High Sierra";
        } else if (userAgentStr.includes("x 10.14") || userAgentStr.includes("x 10_14")) {
            result += " 10.14 Mojave";
        } else if (userAgentStr.includes("x 10.15") || userAgentStr.includes("x 10_15")) {
            result += " 10.15 Catalina";
        } else if (userAgentStr.includes("x 11") || userAgentStr.includes("x 11")) {
            result += " 11 Big Sur";
        } else if (userAgentStr.includes("x 12") || userAgentStr.includes("x 12")) {
            result += " 12 Monterey";
        } else if (userAgentStr.includes("x 13") || userAgentStr.includes("x 13")) {
            result += " 13 Ventura";
        } else if (userAgentStr.includes("x 14") || userAgentStr.includes("x 14")) {
            result += " 14 Sonoma";
        } else if (userAgentStr.includes("x 15") || userAgentStr.includes("x 15")) {
            result += " 15 Sequoia";
        }
    } else if (userAgentStr.includes("android")) {
        result = "Android";
        if (userAgentStr.includes("android 1.5")) {
            result += " 1.5 Cupcake";
        } else if (userAgentStr.includes("android 1.6")) {
            result += " 1.6 Donut";
        } else if (userAgentStr.includes("android 2.0")) {
            result += " 2.0 Eclair";
        } else if (userAgentStr.includes("android 2.1")) {
            result += " 2.1 Eclair";
        } else if (userAgentStr.includes("android 2.2")) {
            result += " 2.2 Froyo";
        } else if (userAgentStr.includes("android 2.3")) {
            result += " 2.3 Gingerbread";
        } else if (userAgentStr.includes("android 2.4")) {
            result += " 2.4 Gingerbread";
        } else if (userAgentStr.includes("android 3.0")) {
            result += " 3.0 Honeycomb";
        } else if (userAgentStr.includes("android 3.1")) {
            result += " 3.1 Honeycomb";
        } else if (userAgentStr.includes("android 3.2")) {
            result += " 3.2 Honeycomb";
        } else if (userAgentStr.includes("android 4.0")) {
            result += " 4.0 Ice Cream Sandwich";
        } else if (userAgentStr.includes("android 4.1")) {
            result += " 4.1 Jelly Bean";
        } else if (userAgentStr.includes("android 4.2")) {
            result += " 4.2 Jelly Bean";
        } else if (userAgentStr.includes("android 4.3")) {
            result += " 4.3 Jelly Bean";
        } else if (userAgentStr.includes("android 4.4W")) {
            result += " 4.4W";
        } else if (userAgentStr.includes("android 4.4")) {
            result += " 4.4 KitKat";
        } else if (userAgentStr.includes("android 5.0")) {
            result += " 5.0 Lollipop";
        } else if (userAgentStr.includes("android 6.0")) {
            result += " 6.0 Marshmallow";
        } else if (userAgentStr.includes("android 7.0")) {
            result += " 7.0 Nougat";
        } else if (userAgentStr.includes("android 7.1")) {
            result += " 7.1 Nougat";
        } else if (userAgentStr.includes("android 8.0")) {
            result += " 8.0 Oreo";
        } else if (userAgentStr.includes("android 8.1")) {
            result += " 8.1 Oreo";
        } else if (userAgentStr.includes("android 9")) {
            result += " 9 Pie";
        } else if (userAgentStr.includes("android 10")) {
            result += " 10 Q";
        } else if (userAgentStr.includes("android 11")) {
            result += " 11 R";
        } else if (userAgentStr.includes("android 12L")) {
            result += " 12L Sv2";
        } else if (userAgentStr.includes("android 12")) {
            result += " 12 S";
        } else if (userAgentStr.includes("android 13")) {
            result += " 13 Tiramisu";
        } else if (userAgentStr.includes("android 14")) {
            result += " 14 Upside Down Cake";
        } else if (userAgentStr.includes("android 15")) {
            result += " 15 Vanilla Ice Cream";
        } else if (userAgentStr.includes("android 16")) {
            result += " 16 Baklava";
        }
    } else if (userAgentStr.includes("linux")) {
        result = "Linux";
    } else {
        result = "N/A";
    }
    return result;
}

// -----------------------------------------------------------------------------
// ブラウザ情報を調べる
// -----------------------------------------------------------------------------
function getBrowserInfo() {
    const userAgentStr = navigator.userAgent.toLowerCase();
    var result = "N/A";
    if (userAgentStr.includes("msie")) {
        result = "Internet Explorer";
    } else if (userAgentStr.includes("edge")) {
        result = "Edge";
    } else if (userAgentStr.includes("chrome")) {
        result = "Google Chrome";
    } else if (userAgentStr.includes("safari")) {
        result = "Safari";
    } else if (userAgentStr.includes("firefox")) {
        result = "FireFox";
    } else if (userAgentStr.includes("opera")) {
        result = "Opera";
    }
    return result;
}

// -----------------------------------------------------------------------------
// Cookieが有効かどうかを調べる
// -----------------------------------------------------------------------------
function checkCookieEnable() {
    // Cookieの設定
    var setCookie = function (cookieName, value) {
        var cookie = cookieName + "=" + value + ";";
        document.cookie = cookie;
    }
    // Cookieの取得
    var getCookie = function (cookieName) {
        var len = cookieName.length + 1;
        var cookieAry = document.cookie.split("; ");
        var value = "";
        for (i = 0; i < cookieAry.length; i++) {
            if (cookieAry[i].substring(0, len) === cookieName + "=") {
                value = cookieAry[i].substring(len, cookieAry[i].length);
                break;
            }
        }
        return value;
    }
    // メイン処理
    try {
        const checkCookieName = "check_cookie";
        setCookie(checkCookieName, true);
        var value = getCookie(checkCookieName);
        return value ? true : false;
    } catch (err) {
        return false;
    }
}

// -----------------------------------------------------------------------------
// スクリーンショット画像を取得する
// -----------------------------------------------------------------------------
function captureTab() {
    var capture = chrome.tabs.captureVisibleTab();
    capture.then(onCapturedTab, onCapturedTabError);
}

// -----------------------------------------------------------------------------
// スクリーンショット画像取得完了処理
// -----------------------------------------------------------------------------
function onCapturedTab(imageUri) {
    document.getElementById("screenShotLabel").innerText = imageUri;
    document.getElementById("screenShotImage").src = imageUri;
}

// -----------------------------------------------------------------------------
// スクリーンショット画像取得エラー処理
// -----------------------------------------------------------------------------
function onCapturedTabError(err) {
    document.getElementById("status").innerText = "申し訳ありません。\r\nスクリーンショット画像の取得中にエラーが発生しました。\r\n" + err.message;
    console.error("decodeURIComponent ERROR:", err);
}

// -----------------------------------------------------------------------------
// レポートファイル生成処理
// -----------------------------------------------------------------------------
function exportReportFile() {
    try {
        let html = [
            "<!DOCTYPE html>",
            "<html lang=\"ja\">",
            "    <head>",
            "        <meta charset=\"UTF-8\" />",
            "        <title>Web Page Report</title>",
            "    </head>",
            "    <body>",
            "        <span><b>作成日時: </b></span> <span id=\"dateTimeLabel\">" + document.getElementById("dateTimeLabel").innerText + "</span><br />",
            "        <span><b>[サイト情報]</b></span><br />",
            "        <span><b>タイトル:</b></span><br />",
            "        <span id=\"titleLabel\">" + document.getElementById("titleLabel").innerText + "</span><br />",
            "        <span><b>URL:</b></span><br />",
            "        <span id=\"urlLabel\">" + document.getElementById("urlLabel").innerText + "</span><br />",
            "        <span><b>URL(Decode):</b></span><br />",
            "        <span id=\"urlDecodeLabel\">" + document.getElementById("urlDecodeLabel").innerText + "</span><br />",
            "        <hr />",
            "        <span><b>[デバイス情報]</b></span><br />",
            "        <span><b>Device:</b></span> <span id=\"deviceLabel\">" + document.getElementById("deviceLabel").innerText + "</span><br />",
            "        <span><b>OS:</b></span> <span id=\"osLabel\">" + document.getElementById("osLabel").innerText + "</span><br />",
            "        <span><b>Browser:</b></span> <span id=\"browserLabel\">" + document.getElementById("browserLabel").innerText + "</span><br />",
            "        <span><b>Cookie:</b></span> <span id=\"cookieEnableLabel\">" + document.getElementById("cookieEnableLabel").innerText + "</span><Br />",
            "        <span><b>Language:</b></span> <span id=\"languageLabel\">" + document.getElementById("languageLabel").innerText + "</span><br />",
            "        <span><b>Screen:</b></span> <span id=\"screenLabel\">" + document.getElementById("screenLabel").innerText + "</span><br />",
            "        <span><b>Browser Screen:</b></span> <span id=\"outerSizeLabel\">" + document.getElementById("outerSizeLabel").innerText + "</span><br />",
            "        <span><b>Browser Inner Screen:</b></span> <span id=\"innerSizeLabel\">" + document.getElementById("innerSizeLabel").innerText + "</span><br />",
            "        <span><b>User Agent:</b></span><br />",
            "        <span id=\"userAgentLabel\">" + document.getElementById("userAgentLabel").innerText + "</span><br />",
            "        <span><b>Screen Shot:</b></span><br />",
            "        <img id=\"screenShotImage\" src=\"" + document.getElementById("screenShotImage").src +  "\" /><br />",
            "        <hr />",
            "    </body>",
            "</html>"
        ];
        let blob = new Blob(html, {type: "text/html"});
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Report.html";
        link.click();
    } catch (err) {
        document.getElementById("status").innerText = "申し訳ありません。\r\nレポート出力中にエラーが発生しました。\r\n" + err.message;
        console.error("decodeURIComponent ERROR:", err);
    }
}

// -----------------------------------------------------------------------------
// URLをデコードする関数
// -----------------------------------------------------------------------------
function decodeUnicode(url) {
    try {
        url = decodeURIComponent(url);
        // UTF-16（%uXXXX 形式）を通常の URL エンコードに変換してデコード
        url = url.replace(/%u([0-9A-Fa-f]{4})/g, function (match, hex) {
            return String.fromCharCode(parseInt(hex, 16));
        });
    } catch (err) {
        // UTF-16（%uXXXX 形式）を通常の URL エンコードに変換してデコード
        url = url.replace(/%u([0-9A-Fa-f]{4})/g, function (match, hex) {
            return String.fromCharCode(parseInt(hex, 16));
        });
    }
    try {
        url = decodeURIComponent(url);
    } catch (err) {
        document.getElementById("status").innerText = "申し訳ありません。\r\nURLのデコード処理中にエラーが発生しました。\r\n" + err.message;
        console.error("decodeURIComponent ERROR:", url, err);
    }
    return url;
}
