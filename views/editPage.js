const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (page, author) =>
  layout(html`
    <h3>Edit a Page</h3>
    <hr />
    <form method="POST" action="/wiki/${page.slug}?_method=PUT">

      <div class="form-group">
        <div class="col-sm-2">Author: </div>
        <div class="col-sm-10">
          ${author.name}
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-2">email: </div>
        <div class="col-sm-10">
          ${author.email}
        </div>
      </div>

      <div class="form-group">
        <label for="title" class="col-sm-2 control-label">Page Title</label>
        <div class="col-sm-10">
          <input
            name="title"
            type="text"
            class="form-control"
            value="${page.title}"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="content" class="col-sm-2 control-label">Content</label>
        <div class="col-sm-10">
          <textarea rows="20"
            name="content"
            type="text"
            class="form-control"
          >${page.content}
          </textarea>
        </div>
      </div>
      </div>

      <div class="form-group">
        <label for="status" class="col-sm-2 control-label">Status</label>
        <div class="col-sm-10">
          <select name="status">
            <option ${page.status == "open" ? "selected" : ""}>open</option>
            <option ${page.status == "closed" ? "selected" : ""}>closed</option>
          </select>
        </div>
      </div>

      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">submit</button>
      </div>

      </div>
    </form>
  `);
