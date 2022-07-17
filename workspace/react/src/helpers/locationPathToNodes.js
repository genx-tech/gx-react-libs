export default function (fullPath) {
    let path = fullPath;
    let nodes = [path];
    let lastPos = path.lastIndexOf('/');
    while (lastPos > 0) {
        path = path.substr(0, lastPos);
        nodes.push(path);
        lastPos = path.lastIndexOf('/');
    }

    return nodes;
}
