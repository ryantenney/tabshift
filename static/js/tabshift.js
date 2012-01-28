$(function () {

	var $ul = $("ul");
	var $count = $("#itemCount");
	var li_template = $("#li_template").template();

	$("#btnRefresh").click(loadTabs);

	loadTabs();

	function loadTabs() {
		$.mobile.showPageLoadingMsg();
		return $.get("/tabs/").then(function (data) {
			var tabs = _(data).values().sort(tabOrderComparator);
			$.tmpl(li_template, tabs).appendTo($ul.empty());
			$ul.listview("refresh");
			$count.text(tabs.length);
			$.mobile.hidePageLoadingMsg();
		});
	}

	function tabOrderComparator(a, b) {
		return a.windowId != b.windowId ? a.windowId - b.windowId : a.index - b.index;
	}
});
