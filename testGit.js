var userSearch;
var reposData;
document.getElementById("searchBtn").addEventListener("click", gitUserCall);

function gitUserCall() {
  var endPointUser = "https://api.github.com/users/";
  var userName = document.getElementById("searchUser").value;
  document.getElementById("searchUser").value = "";
  var userUrl = endPointUser + userName;
  getGitData(userUrl);
}

function getGitData(userGit) {
  fetch(userGit, {
    method: "GET",
  }).then(function (response) {
    if (response.ok) {
      showHideElement("updateUI");
      return response.json();
    } else {
      showHideElement("noResults");
    }
    throw new Error(response.statusText);
  }).then(function (json) {

    userSearch = json;
    userMainData(userSearch);
    

    if (userSearch.public_repos > 0) {
      getReposUser(userSearch.repos_url);
    } else {
      document.getElementById("noRepo").style.display = "block";
    }
  }).catch(function (error) {
    console.log("Request failed: " + error.message);
  });
}

function getReposUser(reposParam) {
  fetch(reposParam, {
    method: "GET",
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  }).then(function (json) {
    reposData = json;
    showUserData(reposData);

  }).catch(function (error) {
    console.log("Request failed: " + error.message);
  });
}

function userMainData(mainData) {

  var img = mainData.avatar_url;
  document.getElementById("outputAvatar").innerHTML = "<img class=userLogo src=" + img + " alt=userLogo>";

  var divData = document.getElementById("outputData");
  var login = document.createElement("p");
  login.setAttribute("class", "pLogin");
  var name = document.createElement("p");
  name.setAttribute("class", "pName");
  var bio = document.createElement("p");
  bio.setAttribute("class", "pBio");

  login.innerHTML = "@" + mainData.login;
  name.innerHTML = mainData.name;
  bio.innerHTML = mainData.bio;

  divData.appendChild(login);
  divData.appendChild(name);
  divData.appendChild(bio);
}

function showHideElement(state) {

  if (state == "noResults") {
    document.getElementById("userRepo").style.display = "none";
    document.getElementById("userOutput").style.display = "none";
    document.getElementById("noResult").style.display = "flex";
  }
  if (state == "updateUI") {
    document.getElementById("userRepo").style.display = "block";
    document.getElementById("userOutput").style.display = "flex";
    document.getElementById("noResult").style.display = "none";
    document.getElementById("noRepo").style.display = "none";
    document.getElementById("outputAvatar").innerHTML = "";
    document.getElementById("outputData").innerHTML = "";
    document.getElementById("listRepo").innerHTML = "";
  }
}

function showUserData(reposData) {

  var listRepo = document.getElementById("listRepo");

  for (var i = 0; i < reposData.length; i++) {
    var listItem = document.createElement("li");

    listItem.innerHTML += '<div class=reposName>' + reposData[i].name + '</div>' + '<div class=rateUser>' + '<img class=glyphicons src=glyphicons-star.png>' + " " + reposData[i].forks + " " + '<img class=glyphicons src=glyphicons-branch.png>' + " " + reposData[i].stargazers_count + '</div>';

    listRepo.appendChild(listItem);
  }
}
