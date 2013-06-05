function View(bookmarkModel) {
  chrome.bookmarks.getTree(function(results) {
    var folder = bookmarkModel.getHtmlBookmarkFolder(results[0].children);

    $('.bookmark-folder-list').html(folder);

    $('.expand-icon').bind('click', function(e) {
      if (this.parentElement.parentElement.getAttribute('expanded') == null) {
        this.parentElement.parentElement.setAttribute('expanded', '');
        this.parentElement.parentElement.querySelector('.tree-children').setAttribute('expanded', '');
      } else {
        this.parentElement.parentElement.removeAttribute('expanded');
        this.parentElement.parentElement.querySelector('.tree-children').removeAttribute('expanded');
      }
    });

    $('.tree-label').bind('click', function(e) {
      var dataId = this.parentElement.getAttribute('data-id');

      $('.tree-row[selected]').removeAttr('selected');
      this.parentElement.setAttribute('selected', '');

      chrome.bookmarks.getChildren(dataId, function(results) {
        var view = bookmarkModel.getHtmlBookmarkView(results);

        $('.bookmark-list').html(view);
      });
    });
  });
}