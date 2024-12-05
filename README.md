
# ❌🖥️ XVFB Github Action

This action installs [XVFB](http://elementalselenium.com/tips/38-headless) and runs your headless tests with it. It cleans up the xvfb process after your tests are done. If it detects you're not using linux then your tests still run, but without xvfb, which is very practical for multi-platform workflows.

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
        uses: GabrielBB/xvfb-action@v1
        with:
          run: npm test
          working-directory: ./ #optional
          options: #optional
```
