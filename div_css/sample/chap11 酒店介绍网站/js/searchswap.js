function javascriptSetup(){

	//change to the ajax search
	// will need to edit search url when migrating servers
	this.searchForm = document.getElementById("searchForm");
	this.searchForm.setAttribute('action','http://www.ago.net/search');
	this.q = document.getElementById("q");
	this.q.setAttribute('value','Search	');
	this.q.setAttribute('name','Q');

}

window.onload = javascriptSetup;