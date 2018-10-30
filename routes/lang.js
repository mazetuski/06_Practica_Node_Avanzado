const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
  const locale = req.params.locale;
  const backTo = req.get('referer');
  // add new lang to our cookie
  res.cookie('nodepop-miguel-zamora-lang', locale, { maxAge: 360000 });
  // redirect to the last page
  res.redirect(backTo);
});

module.exports = router;