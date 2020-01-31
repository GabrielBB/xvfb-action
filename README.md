
# XVFB Github Action

This Github Action installs [XVFB](http://elementalselenium.com/tips/38-headless)  and runs your headless tests with it. It cleans up the xvfb process after your tests are done. If it detects you're not using linux then your tests still run, but without xvfb, which is very practical for workflows that run on different platforms.

### Example usage

```yml
on: [push]

jobs:
  build:
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Run headless test
        uses: gabrielbb/xvfb@v1
        with:
          run: npm test
```
