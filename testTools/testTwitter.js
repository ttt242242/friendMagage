// twitterモジュールを読み込み
// var twitter = require('twitter');
var twitter = require('ntwitter');
var jquery_js = 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js' ;
// アプリ登録時に取得したkeyを入れてOAuth認証し、初期化
var client = new twitter({
    consumer_key: 'aGA7n6dx5LUOp5809D0SzYwV4',
    consumer_secret: '7XjOBwzUuswPSAx4XyW1jGMmqYMyjoLilqpd41RLGj3UrBXorg',
    access_token_key: '1656187634-FuFad4Aq4JJqS5KHhn71EBgKSOD3ejAcGECX2pF',
    access_token_secret: 'yD6J7nxHxzIOTd21ijhDKtA7CQf42KmJB8AInneRsCXJW'
});
// あらかじめアプリ登録して取得
var CONSUMER = {
    "key" : 'aGA7n6dx5LUOp5809D0SzYwV4',
    "secret" : '7XjOBwzUuswPSAx4XyW1jGMmqYMyjoLilqpd41RLGj3UrBXorg' 
};

// ユーザの自前アカウントで取ってきてもらってもいいし、アプリ固有のを埋め込んでもいい
var ACCESS = {
    "screen_name" : false,
    "key" : false,
    "secret" : false
};

// url : APIのURL。GETクエリを含むもの
// callBackFunc : コールバック関数　第一引数にAPIアクセスの結果が連想配列のObjectで渡る
// onerror : Functionをセットすると、scriptタグ埋め込みに失敗した時の挙動を定義可
function getTwitterAPI(url, callBackFunc, onerror){
    var parameters = {
        oauth_signature_method: "HMAC-SHA1",
        oauth_consumer_key: CONSUMER['key'],
        oauth_token: ACCESS['key'],
        callback: callBackFunc
    };
    var api_url = url;
    var message = {
        method: "GET",
        action: api_url,
        parameters: parameters
    };
    var secretKeys = {
        "consumerSecret" : CONSUMER['secret'],
        "tokenSecret" : ACCESS['secret']
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, secretKeys);
    var signed_url = OAuth.addToURL(api_url, parameters);

    var ele = document.createElement("script");

    if(is('Function', onerror)){
        ele.onerror = onerror;
    }

    var head = document.getElementsByTagName('head').item(0);
    ele.type = "text/javascript";
    ele.src = signed_url;
    head.appendChild(ele);
}

function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}


// Public APIのstatuses/filterで取得したタイムラインを、自分のアカウント名を含む文字列でフィルターする
// client.stream( 'statuses/filter', { track : 'kafafafafae812' }, function( stream ) {
//     // フィルターされたデータのストリームを受け取り、ツイートのテキストを表示する
//     stream.on( 'data', function( data ) {
//         var text = data.text; // ツイートのテキスト
//         var textCleaned = text.replace( /kafafafafae812/g, "" ); // アカウント名は不要
//         console.log( data );
//     });
// });


// Public APIのstatuses/filterで取得したタイムラインを、自分のアカウント名を含む文字列でフィルターする
// client.stream( 'statuses/public',  function( stream ) {
//     // フィルターされたデータのストリームを受け取り、ツイートのテキストを表示する
//     stream.on( 'data', function( data ) {
//         var text = data.text; // ツイートのテキスト
//         console.log( text);
//     });
// });
//

getTwitterAPI('https://api.twitter.com/1.1/users/show?screen_name=hoge&user_id=78014802',  'callback_user') ;

function callback_user(json){
    var user = json ;
    console.log(user) ;
    alert(user['followers_count']) ;
}

