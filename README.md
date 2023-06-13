# h5p-timeline

An H5P wrapper around [TimelineJS](https://timeline.knightlab.com/). Please note
that TimelineJS is used as a module dependency and itself is licensed under the
Mozilla Public License 2.0. Please find the code if TimelineJS at
https://github.com/NUKnightLab/TimelineJS3.

The font that is included is PT Serif by ParaType and is licensed under the
[Open Font License](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL).

## Building and running on localhost
Please first refer to https://h5p.org/development-environment if you are not
familiar with how an H5P development environment works.

Clone this repository with git and check out the branch that you are interested
in (or choose the branch first and then download the archive, but learning
how to use git really makes sense).

Change to the repository directory and run
```bash
npm install
```

to install required modules. Afterwards, you can build the project using
```bash
npm run build
```

or, if you want to let everything be built continuously while you are making
changes to the code, run
```bash
npm run watch
```
Before putting the code in production, you should always run `npm run build`.

Also, you should run
```bash
npm run lint
```
in order to check for coding style guide violations.

In addition, you should run
```bash
npm run test
```
to run some automated tests that may file if new code broke things.

In order to pack an H5P library, please install the
[H5P CLI tool](https://h5p.org/h5p-cli-guide) instead of zipping everything
manually. That tool will take care of a couple of things automatically that you
will need to know otherwise.

In simple cases, something such as
```bash
h5p pack <your-repository-directory> my-awesome-library.h5p
```
will suffice.

For more information on how to use H5P, please have a look at
https://youtu.be/xEgBJaRUBGg and the H5P developer guide at
https://h5p.org/library-development.
