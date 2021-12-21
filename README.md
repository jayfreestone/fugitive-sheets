# fugitive sheets

![Social image](./public/img/apple-touch-icon.png)

A small experiment created for [Dusty Domains](https://dusty.domains/).

View the site [here](https://www.fugitivesheets.com/).

## Notes

Shapes are randomly generated using [blobshape](https://github.com/lokesh-coder/blobshape).

The copy is pulled from a set of files stored in the repo/filesystem. Each request picks a file in the directory, extracts the front-matter (it's really markdown in file extension only) and uses the body as the filler for the shape. No doubt this is considerably slower than a lightweight database, but it does the trick here.

The implementation is somewhat complicated/restricted by the need to use serverless functions, which are inherently stateless and therefore cannot be used with in-memory caches (e.g. of the filesystem, or a pre-generated set of responses). The result is that it is hard to be smart about performance at the application level, without significantly changing the structure and introducing an external out-of-process dependency.
