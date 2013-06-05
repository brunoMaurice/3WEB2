(function() {
  var a = 7;
  var a2 = a / 2;
  var ctx = document.getCSSCanvasContext('2d', 'tree-triangle', a + 1, a2 + 2);

  ctx.fillStyle = '#000';
  ctx.translate(.5, .5);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 1);
  ctx.lineTo(a2, 1 + a2);
  ctx.lineTo(a, 1);
  ctx.lineTo(a, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
})();

function Bookmark() {}

Bookmark.prototype.getHtmlBookmarkFolder = function(bookmarkNode, hisChildren, nb) {
  var self = this;
  var head = '', foot = '', body = '';

  hisChildren = hisChildren || false;
  nb = nb || 0;

  if (hisChildren) {
    head = '<div class="tree-children">';
    foot = '</div>';
  }

  var length = bookmarkNode.length;

  for (var i = 0; i < length; i++) {
    if (bookmarkNode[i].children == undefined) {
      continue;
    }

    var haveChildren = (bookmarkNode[i].children.length > 0) ? true : false;

    var folder = (haveChildren) ? self.getHtmlBookmarkFolder(bookmarkNode[i].children, true, nb + 1) : '';

    body += '<div class="tree-item" role="treeitem"';
    body += (folder != '' && folder != head+foot) ? 'expanded' : '';
    body += '>\
        <div class="tree-row" style="-webkit-padding-start: '+nb*20+'px;"';
    body += (folder != '' && folder != head+foot) ? 'may-have-children' : '';   
    body += ' data-id='+bookmarkNode[i].id+'>\
          <span class="expand-icon"></span>\
          <span class="tree-label">'+bookmarkNode[i].title+'</span>\
        </div>\
    ';
    body += folder;
    body += '</div>';
  }

  if (body != '') {
    head = head.replace('>', ' expanded >')
  }

  return head+body+foot;
}

Bookmark.prototype.getHtmlBookmarkView = function(bookmarkNode) {
  var self = this;
  var body = '';

  var length = bookmarkNode.length;

  for (var i = 0; i < length; i++) {
    var url = (bookmarkNode[i].url != undefined) ? bookmarkNode[i].url : null;

    body += '<div role="listitem" draggable="true" ';
    body += (url == null) ? 'class="folder"' : '';
    body += '><div class="label">'+bookmarkNode[i].title+'</div>';
    body += '<div class="url">';
    body += (url != null) ? url : '';
    body += '</div></div>';
  }

  return body;
}