const imports = {
  index: index = () => import(/* webpackChunkName: "index" */ './pages/index/index'),
  notes: notes = () => import(/* webpackChunkName: "notes" */ './pages/notes/notes')
}

module.exports = imports;