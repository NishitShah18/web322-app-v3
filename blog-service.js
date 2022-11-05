const file = require("fs"); //to use file system module

var posts = [];
var categories = [];

initialize = () => {
  return new Promise((resolve, reject) => {
    file.readFile("./data/posts.json", "utf8", (err, data) => {
      if (err) {
        reject("unable to read file");
      } else {
        posts = JSON.parse(data);
      }
    });

    file.readFile("./data/categories.json", "utf8", (err, data) => {
      if (err) {
        reject("unable to read file");
      } else {
        categories = JSON.parse(data);
      }
    });
    resolve();
  });
};
getAllPosts = () => {
  return new Promise((resolve, reject) => {
    if (posts.length == 0) {
      reject("no results returned");
    } else {
      resolve(posts);
    }
  });
};

getPublishedPosts = () => {
  return new Promise((resolve, reject) => {
    var publish = posts.filter((post) => post.published);
    if (publish.length === 0) {
      reject("no results returned");
    } else {
      resolve(publish);
    }
  });
};

getCategories = () => {
  return new Promise((resolve, reject) => {
    if (categories.length == 0) {
      reject("no results returned");
    } else {
      resolve(categories);
    }
  });
};
addPost = (postData) => {
  var day = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  return new Promise(function (resolve, reject) {
    try {
      postData.published = postData.published ? true : false;
      postData.id = posts.length + 1;
      if (day < 10 && month < 10) {
        postData.postDate = year + "-" + "0" + month + "-" + "0" + day;
      } else if (month < 10) {
        postData.postDate = year + "-" + "0" + month + "-" + day;
      } else if (day < 10) {
        postData.postDate = year + "-" + month + "-" + "0" + day;
      } else {
        postData.postDate = year + "-" + month + "-" + day;
      }
      posts.push(postData);
      resolve(postData);
    } catch (err) {
      reject();
    }
  });
};
getPostsByCategory = (category) => {
  {
    return new Promise(function (resolve, reject) {
      var category_posts = [];

      var j = 0;

      for (var i = 0; i < posts.length; i++) {
        if (posts[i].category == category) {
          category_posts[j++] = posts[i];
        }
      }
      if (category_posts.length == 0) {
        reject("no results returned");
      } else {
        resolve(category_posts);
      }
    });
  }
};
getPublishedPostsByCategory = function (category) {
  return new Promise((resolve, reject) => {
    if (posts.length > 0) {
      let postsByCategory = posts.filter((post) => {
        return post.published == true && post.category == category;
      });
      if (postsByCategory.length > 0) {
        resolve(postsByCategory);
      } else {
        reject("no results returned");
      }
    }
  });
};
getPostsByMinDate = (minDateStr) => {
  {
    return new Promise(function (resolve, reject) {
      var date_posts = [];

      var j = 0;

      for (var i = 0; i < posts.length; i++) {
        if (new Date(posts[i].postDate) >= new Date(minDateStr)) {
          date_posts[j++] = posts[i];
        }
      }
      if (date_posts.length == 0) {
        reject("no results returned");
      } else {
        resolve(date_posts);
      }
    });
  }
};
getPostById = (id) => {
  return new Promise((resolve, reject) => {
    var id_posts = [];
    var j = 0;
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].id == id) {
        id_posts[j++] = posts[i];
      }
    }

    if (id_posts.length == 0) {
      reject("no results returned");
    } else {
      resolve(id_posts[0]);
    }
  });
};

module.exports = {
  initialize,
  getAllPosts,
  getPublishedPosts,
  getCategories,
  addPost,
  getPostsByCategory,
  getPublishedPostsByCategory,
  getPostsByMinDate,
  getPostById,
};
