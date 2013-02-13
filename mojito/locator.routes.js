module.exports = [
//     {
//         'pattern': '/mojits/:mojit/:filename.json$',
//         'param': {'action': 'mojitconfig'}
//     },
//     {
//         'pattern': '/:filename.json$',
//         'param': {'action': 'appconfig'}
//     },
//     {
//         'pattern': '/mojits/:mojit/controller.:selector.js$',
//         'param': {'action': 'controller'}
//     },
//     {
//         'pattern': '/mojits/:mojit/models/:filename.:selector.js$',
//         'param': {'action': 'model'}
//     },
//     {
//         'pattern': '/mojits/:mojit/views/:filename.:selector.hb.html$',
//         'param': {'action': 'view'}
//     },
//     {
//         'pattern': '/mojits/:mojit/binders/:filename.js$',
//         'param': {'action': 'binder'}
//     },
    {
        'pattern': '/assets/•subpath',
        'param': {'action': 'staticasset'}
    }
];
