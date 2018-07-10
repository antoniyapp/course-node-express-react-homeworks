/**
 * This file provided by IPT-Intellectual Products & Technologies (IPT)
 * is for non-commercial testing and evaluation purposes only. 
 * IPT reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

const express = require('express');
const router = express.Router();
const error = require('./helpers').sendErrorResponse;
const util = require('util');
const indicative = require('indicative');


// GET posts list (optionally by author)
router.get('/', function (req, res) {
  const db = req.app.locals.db;
  let sqlQuery = 'SELECT * FROM posts';
  const qParams = [];

  if (req.query.author) {
    sqlQuery += ' WHERE author = ?';
    qParams.push(req.params.author);
  }

  db.all(sqlQuery, qParams, function (err, results) {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

// GET single post by id
router.get('/:postID', (req, res) => {
  const db = req.app.locals.db;
  const params = indicative.sanitize(req.params, { postID: 'to_int' });

  indicative.validate(params, { postID: 'required|integer|above:0' })
    .then(() => {
      db.get('SELECT * FROM posts WHERE id = ?', [params.postID], function (err, result) {
        if (err) throw err;
        if (typeof result !== 'undefined') {
          res.json(result);
        }
        else {
          error(req, res, 404, { errors: [`POST with Id=${params.postID} not found.`] });
          console.log('y');
        }
      });
    }).catch(errors => {
      error(req, res, 400, 'Invalid post ID: ' + util.inspect(errors))
    });
});

// Create new post
router.post('/', function (req, res) {
  const db = req.app.locals.db;
  let post = req.body;
  indicative.validate(req.body, {
    id: 'integer|above:0',
    title:'required|string',
    author: 'required|string',
    text: 'required|string',
    tags: 'required|string',
    url:'required|string'
    
  }).then(() => {
    db.run(`INSERT INTO posts (date,id,title,author, text,tags,url,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, [post.date,post.id,post.title,post.author, post.text,post.tags,post.url,post.status], function (err) {
      if (err) {
        console.error(err);
        error(req, res, 500, `Error creating new post: ${post}`);
      }
      const uri = req.baseUrl + '/' + post.id;
      console.log('Created: ', uri);
      res.location(uri).status(201).json(post);
    });
  }).catch(errors => {
    error(req, res, 400, `Invalid post data: ${util.inspect(errors)}`);
  });
});

// Edit existing post
router.put('/:postID', (req, res) => {
  const db = req.app.locals.db;
  let post = req.body;
  const params = indicative.sanitize(req.params, { postID: 'to_int' });

  indicative.validate(post, {
    id: 'integer|above:0',
    author: 'required|string',
    text: 'required|string',
    tags: 'required|string',
    url:'required|string',
  }).then(validated => {
    if(params.postID !== post.id) {
      error(req, res, 400, 'Invalid post ID: ' + post.id);
      return;
    }
    db.run(`UPDATE posts SET title = ?,text = ?,author = ?, tags = ?,url = ?,status = ? WHERE id= ?`, 
      [post.title,validated.text,validated.author, post.tags,post.url,post.status, validated.id], function(err) {
        if (err) {
          console.error(err);
          error(req, res, 500, `Error creating new comment: ${post}`);
          return;
        }
        if (this.changes > 0) {
          console.log('Updated: ', req.baseUrl);
          res.json({ message: `Post ${params.postID} was updated successfully.` });
        } else {
          error(req, res, 404, `Post with Id=${params.postID} not found.`);
        }
    })
  }).catch(errors => {
    error(req, res, 400, 'Invalid post ID: ' + util.inspect(errors))
  });
});

//Delete post by id
router.delete('/:postID', function (req, res) {
  const db = req.app.locals.db;
  const params = indicative.sanitize(req.params, { postID: 'to_int' });

  indicative.validate(params, { postID: 'required|integer|above:0' })
    .then(() => {
      db.run('DELETE FROM posts WHERE id = ?', [params.postID], function (err) {
        if (err) {
          console.error(err);
          error(req, res, 500, `Error deleting comment with Id: ${params.postID}`);
        }
        if (this.changes > 0) {
          console.log('Deleted: ', req.baseUrl);
          res.json({ message: `POST ${params.postID} was deleted successfully.` });
        } else {
          error(req, res, `POST with Id=${params.postID} not found.`);
        }
      });
    }).catch(errors => {
      error(req, res, 400, 'Invalid POST ID: ' + util.inspect(errors))
    });
});

module.exports = router;
