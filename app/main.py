import tornado.ioloop
import tornado.web
import tornado.websocket
import os

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")

class BinaryWebSocket(tornado.websocket.WebSocketHandler):
    def open(self):
        print "websocket opened"

    def on_message(self, message):
        print "received message: %s" % message
        if message == "0": self.write_message("1")
        elif message == "1": self.write_message("0")
        else: self.write_message("-1")

    def on_close(self):
        print "websocket closed"

application = tornado.web.Application([
    (r"/", MainHandler),
    (r"/ws/binary", BinaryWebSocket),
], **{"static_path": os.path.join(os.path.abspath(os.path.dirname(__file__)), "static")})

if __name__ == "__main__":
    application.listen(12000)
    tornado.ioloop.IOLoop.instance().start()
