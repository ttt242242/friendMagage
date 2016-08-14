
var favo_data ;
(function($){
    var Renderer = function(canvas){
        var canvas = $(canvas).get(0) ;
        var ctx = canvas.getContext("2d");
        // var gfx = arbor.Graphics(canvas) ;
        var particleSystem

            var that = {
                init:function(system){
                    //
                    // particle systemはフレーム描写の前に最初にinit関数を一度だけ呼ぶ。
                    // この関数はキャンバスの指定などに使うのに適している
                    // redraw()関数で使うために自身への参照を保存しておく
                    // save a reference to the particle system for use in the .redraw() loop
                    particleSystem = system

                        // キャンバスのサイズを取得しSystemにセットする
                        // キャンバスサイズが変更されたらこのscreenSizeを新しいサイズで再度呼ぶべきである
                        particleSystem.screenSize(canvas.width, canvas.height) 
                        particleSystem.screenPadding(80) // leave an extra 80px of whitespace per side

                        // ノードをドラッグできるようイベントハンドラをセットする
                        that.initMouseHandling()
                },


                redraw:function(){
                    // 
                    // redrawはノードの位置が変化している間何度も呼び出され続ける
                    // ノードの新しい座標はノードの.p属性を通して参照される
                    // p.xやp.yはスクリーン座標ではなく、particle system内の座標である
                    // スクリーン座標へは自身でマップするか.eachNodeのような便利なイテレーター
                    // を用い座標の変換を行うことが出来る
                                        ctx.fillStyle = "white"
                        ctx.fillRect(0,0, canvas.width, canvas.height)

                        particleSystem.eachEdge(function(edge, pt1, pt2){
                            // edge: {source:Node, target:Node, length:#, data:{}}
                            // pt1:  {x:#, y:#}  source position in screen coords
                            // pt2:  {x:#, y:#}  target position in screen coords

                            // draw a line from pt1 to pt2
                            ctx.strokeStyle = "rgba(0,0,0, .333)"
                                ctx.lineWidth = 1
                                ctx.beginPath()
                                ctx.moveTo(pt1.x, pt1.y)
                                ctx.lineTo(pt2.x, pt2.y)
                                ctx.stroke()



                        })

                    particleSystem.eachNode(function(node, pt){
                        var w = 10 ;
                        // alert(favo_data[node.name]) ;
                        if (favo_data[node.name] != null ){
                            w = 30 ;
                        }
                        ctx.fillStyle = "orange" ;
                        ctx.fillRect (pt.x-w/2,  pt.y-w/2,  w, w) ;
                        ctx.fillStyle = "black" ;
                        ctx.font = 'italic 13px sans-serif' ;
                        ctx.fillText (node.name,  pt.x+8,  pt.y+8) ;

                    })              
                },


                initMouseHandling:function(){
                    //？
                    // no-nonsense drag and drop (thanks springy.js)
                    var dragged = null;

                    // マウス押下のリスナーとドラッグ中のハンドラのセットアップ
                    // set up a handler object that will initially listen for mousedowns then
                    // for moves and mouseups while dragging
                    var handler = {
                        clicked:function(e){
                            var pos = $(canvas).offset();
                            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
                                dragged = particleSystem.nearest(_mouseP);

                            if (dragged && dragged.node !== null){
                                //ドラッグ中はノードの物理的な動きを止めておく
                                // while we're dragging, don't let physics move the node
                                dragged.node.fixed = true
                            }

                            $(canvas).bind('mousemove', handler.dragged)
                                $(window).bind('mouseup', handler.dropped)

                                return false
                        },
                        dragged:function(e){
                            var pos = $(canvas).offset();
                            var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

                                if (dragged && dragged.node !== null){
                                    var p = particleSystem.fromScreen(s)
                                        dragged.node.p = p
                                }

                            return false
                        },

                        dropped:function(e){
                            if (dragged===null || dragged.node===undefined) return
                                if (dragged.node !== null) dragged.node.fixed = false
                                    dragged.node.tempMass = 1000
                                        dragged = null
                                        $(canvas).unbind('mousemove', handler.dragged)
                                        $(window).unbind('mouseup', handler.dropped)
                                        _mouseP = null
                                        return false
                        }
                    }

                    //マウスリスナーを開始
                    // start listening
                    $(canvas).mousedown(handler.clicked);

                },

            }
        return that
    }    

    $(document).ready(function(){
        // create the system with sensible repulsion(反発)/stiffness(剛性)/friction(摩擦)
        var sys = arbor.ParticleSystem(1000, 600, 0.5)

            // グラフの配置を調整するため重力計算を使う
            // use center-gravity to make the graph settle nicely (ymmv)
            sys.parameters({gravity:true})
            //canvasを指定してsysを開始する(まずinit()が呼ばれる)
            // our newly created renderer will have its .init() method called shortly by sys...
            sys.renderer = Renderer("#viewport")

            // ノードとエッジの追加をする
            // add some nodes to the graph and watch it go...

            // ノードaを追加する
            // sys.addNode('a',) ;
            // //ノードaとbをエッジでつなぐ
            // // エッジを追加するとき、無いノードは自動で生成される
            // sys.addEdge('a','b')
            // sys.addEdge('a','c')
            // sys.addEdge('a','d')
            // sys.addEdge('a','e')
            // // ノードのオプション
            // sys.addNode('f', {alone:true, mass:.25})


       
            $.get("graph_data.json" ,  function(data) {
                $.get("favo_data.json" ,  function(data2) {
                //
                    // data2= $.get("favo_data.json") ;
                    favo_data = $.parseJSON(data2) ;
                    console.log(favo_data) ;
                    sys.graft($.parseJSON(data)) ;
                }) ;

            }) ;
    })

})(this.jQuery)
