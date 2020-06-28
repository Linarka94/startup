const browsersync = require("browser-sync").create();

function browserSync(done) {
    browsersync.init({
        server: {
        baseDir: "./public/"
        },
        port: 3000
    });
    done();
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}
