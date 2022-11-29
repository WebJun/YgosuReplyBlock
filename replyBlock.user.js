// ==UserScript==
// @name         YgosuReplyBlock
// @version      20221129203452
// @author       Jun
// @description  이용자 댓글을 내용으로 차단합니다.
// @homepageURL  https://js.cono.kr/ygosu
// @updateURL    https://js.cono.kr/ygosu/replyBlock.user.js
// @include      https://ygosu.com/*
// @include      https://m.ygosu.com/*
// @require      https://code.jquery.com/jquery-1.4.2.min.js
// @run-at       document-end
// ==/UserScript==
if (['ygosu.com', 'm.ygosu.com'].includes(document.domain)) {
    var blockContents = [
        '상선',
        '한의원',
        '경찰청',
    ];

    var YgosuBlock = {
        run: function() {
            /*
            console.log(Date());
            var commentCnt = $('#reply_comment_cnt').text();
            if (commentCnt !== '') {
                clearTimeout(YgosuBlockInterval);
                clearTimeout(YgosuBlockTimeout);
            }
            */
            var $comments = $('.reply table tr .comment');
            if ($comments.length === 0) {
                return false;
            }
            for (var i = 0; $comments.length > i; i++) {
                var commentText = $($comments[i]).text()
                for (var con of blockContents) {
                    if (commentText.indexOf(con) !== -1) {
                        $($comments[i]).text(`차단된 내용이 있는 댓글입니다.(${con})`);
                    }
                }
            }
        }
    };

    var YgosuBlockInterval = setInterval(() => {
        YgosuBlock.run();
    }, 100);
    /*
    var YgosuBlockTimeout = setTimeout(() => {
        clearTimeout(YgosuBlockInterval);
    }, 3000);
    */
}