var H5PUpgrades = window.H5PUpgrades || {};

/* global H5PUpgrades */
H5PUpgrades['H5P.NDLATimeline'] = (() => {
  // Avoiding to use H5P.createUUID as H5P function may change
  const createUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, (char) => {
        const random = Math.random() * 16 | 0;
        const newChar = (char === 'x') ? random : (random & 0x3 | 0x8);
        return newChar.toString(16);
      });
  };

  return {
    0: {
      /**
       * Replace custom copyright widget and use metadata fields.
       * Remove obsolete fields.
       * @param {object} parameters Parameters.
       * @param {function} finished Callback when done.
       * @param {object} extras Extras such as metadata.
       */
      1: (parameters, finished, extras) => {
        if (parameters) {
          const extractAuthors = (author) => {
            if (typeof author !== 'string') {
              return [];
            }

            return author.split(',').map((singleAuthor) => {
              return {
                name: singleAuthor.trim(),
                role: 'Author'
              };
            });
          };

          // Extract metadata title from old copyright title
          const extractTitle = (title) => {
            return (typeof title === 'string') ? title : 'Untitled text';
          };

          // Extract metadata license info from old copyright license info
          const extractLicense = (license) => {
            let name = 'U';
            let version;

            if (typeof license === 'string') {
              name = license;
              if (name === 'PD') {
                name = (version === 'CC PDM') ? 'CC PDM' : 'CC0 1.0';
              }
              else if (name.indexOf('CC BY') === 0) {
                version = '4.0'; // Old copyright widget did NOT store version!
              }
            }

            return [name, version];
          };

          // Extract metadata source from old copyright source
          const extractSource = (source) => {
            const valid = /^https?:\/\/.+$/; // veeery simple ...
            if (!valid.test(source)) {
              return null;
            }

            return (typeof source === 'string') ? source : null;
          };

          // Extract metadata year info from old copyright year info
          const extractYear = (year) => {
            const valid = /^[0-9]+\s*(-\s*[0-9]+)?$/;
            let yearFrom, yearTo;

            if (typeof year === 'string' && valid.test(year)) {
              segments = year.split('-');

              yearFrom = parseInt(segments[0]);
              yearFrom = isNaN(yearFrom) ? null : yearFrom.toString();

              yearTo = parseInt(segments?.[1]);
              yearTo = isNaN(yearTo) ? null : yearTo.toString();
            }

            return [yearFrom, yearTo];
          };

          // Convert old copyright data to metadata
          const convertCopyrightToMedadata = (oldCopyright = {}) => {
            let yearFrom, yearTo;
            [yearFrom, yearTo] = extractYear(oldCopyright.year);

            let license, licenseVersion;
            [license, licenseVersion] = extractLicense(oldCopyright.license);

            return metadata = {
              authors: extractAuthors(oldCopyright?.author),
              title: extractTitle(oldCopyright?.title),
              contentType: 'Text',
              license: license,
              ...(licenseVersion && { licenseVersion: licenseVersion }),
              ...(oldCopyright?.source && {
                source: extractSource(oldCopyright.source)
              }),
              ...(typeof yearFrom === 'number' && { yearFrom: yearFrom }),
              ...(typeof yearTo === 'number' && { yearTo: yearTo }),
              changes: []
            };
          };

          if (parameters.titleSlide?.description) {
            parameters.titleSlide.description = {
              library: 'H5P.Text 1.1',
              metadata: convertCopyrightToMedadata(
                parameters.titleSlide.descriptionCopyright
              ),
              params: { text: parameters.titleSlide.description },
              subContentId: createUUID()
            };

            delete parameters.titleSlide.descriptionCopyright;
          }

          if (parameters.timelineItems) {
            parameters.timelineItems = parameters.timelineItems.map((item) => {
              item.description = {
                library: 'H5P.Text 1.1',
                metadata: convertCopyrightToMedadata(
                  item.descriptionCopyright
                ),
                params: { text: item.description },
                subContentId: createUUID()
              };

              delete item.descriptionCopyright;

              return item;
            });
          }
        }

        if (parameters.behaviour) {
          delete parameters.behaviour.unused;
        }

        finished(null, parameters, extras);
      },

      /**
       * Remove obsolete fields from semantics.
       * @param {object} parameters Parameters.
       * @param {function} finished Callback when done.
       * @param {object} extras Extras such as metadata.
       */
      2: (parameters, finished, extras) => {
        if (parameters) {
          delete parameters.l10n;
        }
        finished(null, parameters, extras);
      }
    }
  };
})();
