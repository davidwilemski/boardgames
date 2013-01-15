function Hex(width, height) {
    this._board = document.getElementById('hex-canvas').getContext('2d');
    this._width = null;
    this._height = null;
    this._hex_width = 50;
    this._points = [];

    this.create = function(width, height) {
        this._width = width;
        this._height = height;
        this.draw_board();
        $('#hex-canvas').on('click',
                            data = { hex: this },
                            this.click_handler);
    };

    this.click_handler = function(e, hex) {
        for (var i = 0; i < e.data.hex._width * e.data.hex._height; i++) {
            var x = e.clientX;
            var y = e.clientY;
            var delta_x = Math.abs(x - e.data.hex._points[i][0]);
            var delta_y = Math.abs(y - e.data.hex._points[i][1]);
            var distance = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
            if (distance <= 20) {
                console.log(distance);
                console.log(i % e.data.hex._width, i / e.data.hex._height)
                e.data.hex.color_hex(i % e.data.hex._width,
                                     Math.floor(i / e.data.hex._height),
                                     'purple');
                break;
            }
        }
    };

    this.draw_hex = function(x, y, row, color) {
        color = typeof color !== 'undefined' ? color : false;

        var _offset = 3.4;
        var _a = this._hex_width / 2.0;
        var _side_length = _a / Math.cos(30.0 * ((2.0 * Math.PI) / 360.0));
        var _b = _a * Math.tan(30.0 * ((2.0 * Math.PI) / 360.0));
        var _start_x = x;
        var _start_y = y - _side_length / 2.0 - _b + (_offset - (2 * _offset) * row);

        this._board.beginPath();
        this._board.moveTo(_start_x, _start_y);
        this._board.lineTo(_start_x + _a, _start_y + _b);
        this._board.lineTo(_start_x + _a, _start_y + _b + _side_length);
        this._board.lineTo(_start_x, _start_y + _b * 2 + _side_length);
        this._board.lineTo(_start_x - _a, _start_y + _b + _side_length);
        this._board.lineTo(_start_x - _a, _start_y + _b);
        this._board.closePath();

        if (color) {
            this._board.fillStyle = color;
            this._board.fill();
        } else {
            this._board.stroke();
        }

        return true;
    };

    this.draw_board = function() {
        for (var y = 0; y < this._height; y++) {
            for (var x = 0; x < this._width; x++) {
                var x_center = 25 + this._hex_width * x + 25 * y;
                var y_center = 25 + this._hex_width * y;
                this.draw_hex(x_center, y_center, y);
                this._points.push([x_center, y_center + 3.4 - 6.8 * y]);
            }
        }

        return true;
    };

    this.color_hex = function(x, y, color) {
        if (x < 0 || x >= this._width) return false;
        if (y < 0 || x >= this._height) return false;

        return this.draw_hex(25 + this._hex_width * x + 25 * y,
                             25 + this._hex_width * y,
                             y,
                             color);
    };

    this.create(width, height);
    return this;
}
