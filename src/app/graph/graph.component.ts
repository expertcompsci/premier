import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { selection, select } from 'd3';

/*
http://www.puzzlr.org/force-directed-graph-minimal-working-example/
*/
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var svg = d3.select("#graph-svg svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(20))

    d3.json("assets/miserables.json", function(error, graph) {
      if (error) throw error;

      var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
          .attr("stroke", "blue")
          .attr("stroke-width", "3");

      var top = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("g");

      var node = top
          .append("circle")
          .attr("r", 40)
          .attr("fill", "white")
          .attr("stroke", "purple")
          .attr("class", "textCircle")
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

      var nodeLabel = top 
          .append("text")
          .attr("text-anchor", "middle")
          .attr("class", "wrapNodeLabel")
          .text(function(d) { return d.id; })
      
      simulation
          .nodes(graph.nodes)
          .on("tick", ticked);

      simulation.force("link")
          .links(graph.links);

      function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        nodeLabel
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; });
      }
    });

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      //d.fx = null;
      //d.fy = null;
    }

    d3.selectAll(".wrapNodeLabel").call(wrap)
 
    function wrap (text) {
            console.log(text);
            console.log(text.text());

/*            var words = text.id.split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            x = text.attr("x"),
            dy = parseFloat(text.attr("y")),
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
            console.log(text.text());

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > 20) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
  */  }
  }

  textWrap() {
    var method,
        verify_bounds,
        resolve_bounds,
        resolve_padding,
        pad,
        dimensions,
        wrap,
        textwrap;

    // test for foreignObject support and determine wrapping strategy
    method = 'tspans';
//    method = typeof SVGForeignObjectElement === 'undefined' ? 'tspans' : 'foreignobject';

    // accept multiple input types as boundaries
    verify_bounds = function(bounds) {
        var bounds_object,
            bounds_function;
        bounds_function = typeof bounds === 'function';
        if (typeof bounds === 'object' && ! bounds.nodeType) {
            if (! bounds.height || ! bounds.width) {
                console.error('text wrapping bounds must specify height and width');
                return false;
            } else {
                return true;
            }
        }
        // convert a selection to bounds
        if (
            bounds instanceof selection ||
            bounds.nodeType ||
            bounds_function ||
            bounds_object
        ) {
            return true;
        // use input as bounds directly
        } else {
            console.error('invalid bounds specified for text wrapping');
            return false;
        }
    };

    resolve_bounds = function(bounds) {
        var properties,
            dimensions,
            result,
            i;
        properties = ['height', 'width'];
        if (typeof bounds === 'function') {
            dimensions = bounds();
        } else if (bounds.nodeType) {
            dimensions = bounds.getBoundingClientRect();
        } else if (typeof bounds === 'object') {
            dimensions = bounds;
        }
        result = Object.create(null);
        for (i = 0; i < properties.length; i++) {
            result[properties[i]] = dimensions[properties[i]];
        }
        return result;
    };

    resolve_padding = function(padding) {
        var result;
        if (typeof padding === 'function') {
            result = padding();
        } else if (typeof padding === 'number') {
            result = padding;
        } else if (typeof padding === 'undefined') {
            result = 0;
        }
        if (typeof result !== 'number') {
            console.error('padding could not be converted into a number');
        } else {
            return result;
        }
    };

    pad = function(dimensions, padding) {
        var padded;
        padded = {
            height: dimensions.height - padding * 2,
            width: dimensions.width - padding * 2
        };
        return padded;
    };

    dimensions = function(bounds, padding) {
        var padded;
        padded = pad(resolve_bounds(bounds), resolve_padding(padding));
        return padded;
    };


    wrap = {};

    // wrap text using foreignobject html
    wrap.foreignobject = function(text, dimensions, padding) {
        var content,
            parent,
            foreignobject,
            div;
        // extract our desired content from the single text element
        content = text.text();
        // remove the text node and replace with a foreign object
        parent = select(text.node().parentNode);
        text.remove();
        foreignobject = parent.append('foreignObject');
        // add foreign object and set dimensions, position, etc
        foreignobject
            .attr('requiredFeatures', 'http://www.w3.org/TR/SVG11/feature#Extensibility')
            .attr('width', dimensions.width)
            .attr('height', dimensions.height);
        if (typeof padding === 'number') {
            foreignobject
                .attr('x', padding)
                .attr('y', padding);
        }
        // insert an HTML div
        div = foreignobject
            .append('xhtml:div');
        // set div to same dimensions as foreign object
        div
            .style('height', dimensions.height)
            .style('width', dimensions.width)
            // insert text content
            .html(content);
        return div;
    };

    // wrap text using tspans
    wrap.tspans = function(text, dimensions, padding) {
        var pieces,
            piece,
            line_width,
            x_offset,
            tspan,
            previous_content;
        pieces = text.text().split(' ').reverse();
        text.text('');
        tspan = text.append('tspan');
        tspan
            .attr('dx', 0)
            .attr('dy', 0);
        x_offset = 0;
        while (pieces.length > 0) {
            piece = pieces.pop();
            tspan.text(tspan.text() + ' ' + piece);
            line_width = tspan.node().getComputedTextLength() || 0;
            if (line_width > dimensions.width) {
                previous_content = tspan.text()
                    .split(' ')
                    .slice(0, -1)
                    .join(' ');
                tspan.text(previous_content);
                x_offset = tspan.node().getComputedTextLength() * -1;
                tspan = text.append('tspan');
                tspan
                    .attr('dx', x_offset)
                    .attr('dy', '1em')
                    .text(piece);
            }
        }
        if (typeof padding === 'number') {
            text
                .attr('y', text.attr('y') + padding)
                .attr('x', text.attr('x') + padding);
        }
    };

    // factory to generate text wrap functions
    textwrap = function() {
        // text wrap function instance
        var wrapper,
            bounds,
            padding;
        wrapper = function(targets) {
            targets.each(function() {
                select(this).call(wrap[method], dimensions(bounds, padding), resolve_padding(padding));
            });
        };
        // get or set wrapping boundaries
        wrapper.bounds = function(new_bounds) {
            if (new_bounds) {
                if (verify_bounds(new_bounds)) {
                    bounds = new_bounds;
                    return wrapper;
                } else {
                    console.error('invalid text wrapping bounds');
                    return false;
                }
            } else {
                return bounds;
            }
        };
        // get or set padding applied on top of boundaries
        wrapper.padding = function(new_padding) {
            if (new_padding) {
                if (typeof new_padding === 'number' || typeof new_padding === 'function') {
                    padding = new_padding;
                    return wrapper;
                } else {
                    console.error('text wrap padding value must be either a number or a function');
                    return false;
                }
            } else {
                return padding;
            }
        };
        // get or set wrapping method
        wrapper.method = function(new_method) {
            if (new_method) {
                method = new_method;
                return wrapper;
            } else {
                return method;
            }
        };
        return wrapper;
    };
  }
}
