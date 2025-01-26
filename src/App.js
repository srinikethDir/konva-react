import React, { useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Text, Image, Transformer } from "react-konva";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DashboardIcon from "@mui/icons-material/Dashboard";

const svgImages = {
  person: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjQiPjwvY2lyY2xlPjxsaW5lIHgxPSIxMiIgeTE9IjEyIiB4Mj0iMTIiIHkyPSIxNiI+PC9saW5lPjxsaW5lIHgxPSIxMiIgeTE9IjE2IiB4Mj0iMTIuMDEiIHkyPSIxNiI+PC9saW5lPjwvc3ZnPg==",
  light: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0Ij48L2NpcmNsZT48bGluZSB4MT0iMTIiIHkxPSI0IiB4Mj0iMTIiIHkyPSIyIj48L2xpbmU+PGxpbmUgeDE9IjE2IiB5MT0iNiIgeDI9IjE4IiB5Mj0iNSI+PC9saW5lPjxsaW5lIHgxPSI4IiB5MT0iNiIgeDI9IjYiIHkyPSI1Ij48L2xpbmU+PC9zdmc+",
  camera: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIxIiB5PSI2IiB3aWR0aD0iMjIiIGhlaWdodD0iMTQiIHJ4PSIxIj48L3JlY3Q+PHBhdGggZD0iTTUgNiBMOSA0IEgxNCI+PC9wYXRoPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiPjwvY2lyY2xlPjwvc3ZnPg==",
};

const EditableText = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const textRef = useRef();
  const trRef = useRef();

  const handleDblClick = () => {
    const textNode = textRef.current;
    const stage = textNode.getStage();
    const textPosition = textNode.absolutePosition();

    const areaPosition = {
      x: stage.container().offsetLeft + textPosition.x,
      y: stage.container().offsetTop + textPosition.y,
    };

    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = textNode.text();
    textarea.style.position = 'absolute';
    textarea.style.top = `${areaPosition.y}px`;
    textarea.style.left = `${areaPosition.x}px`;
    textarea.style.width = `${textNode.width() - textNode.padding() * 2}px`;
    textarea.style.height = `${textNode.height() - textNode.padding() * 2 + 10}px`;
    textarea.style.fontSize = `${textNode.fontSize()}px`;
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = `${textNode.lineHeight()}`;
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.color = textNode.fill();
    textarea.style.transformOrigin = 'left top';

    textNode.hide();

    textarea.focus();

    const removeTextarea = () => {
      textarea.parentNode.removeChild(textarea);
      window.removeEventListener('click', handleOutsideClick);
      textNode.show();
      onChange({
        ...shapeProps,
        text: textarea.value
      });
    };

    textarea.addEventListener('keydown', (e) => {
     
        if (e.keyCode === 13 && !e.shiftKey) {
          removeTextarea(); 

      }
      if (e.keyCode === 27) {
        removeTextarea();
      }
    });

    function handleOutsideClick(e) {
      if (e.target !== textarea) {
        removeTextarea();
      }
    }

    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    });
  };

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        ref={textRef}
        {...shapeProps}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={handleDblClick}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransform={() => {
          const node = textRef.current;
          const newWidth = Math.max(node.width() * node.scaleX(), 20);

          node.setAttrs({
            width: newWidth,
            scaleX: 1,
            scaleY: 1,
          });

          onChange({
            ...shapeProps,
            width: newWidth,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          padding={5}
          enabledAnchors={['middle-left', 'middle-right']}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 20) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

// Rest of the code remains the same as in the original implementation
const EditableImage = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const imageRef = useRef();
  const trRef = useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        ref={imageRef}
        {...shapeProps}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = imageRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) return oldBox;
            return newBox;
          }}
        />
      )}
    </>
  );
};

// Remaining App component is unchanged from the original implementation
const App = () => {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleAddText = () => {
    setElements([
      ...elements,
      {
        id: `text-${elements.length + 1}`,
        type: "text",
        x: 50,
        y: 50,
        text: "Double-click to edit",
        fontSize: 20,
        draggable: true,
        rotation: 0,
        flipEnabled: false,
        width: 200,
      },
    ]);
  };

  // Rest of the code is the same as the original implementation
  const handleImportImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        setElements([
          ...elements,
          {
            id: `image-${elements.length + 1}`,
            type: "image",
            x: 50,
            y: 50,
            width: img.width / 4,
            height: img.height / 4,
            image: img,
            draggable: true,
            rotation: 0,
          },
        ]);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleAddSvgIcon = (svgType) => {
    const img = new window.Image();
    img.src = svgImages[svgType];
    img.onload = () => {
      setElements([
        ...elements,
        {
          id: `icon-${elements.length + 1}`,
          type: "image",
          x: 50,
          y: 50,
          width: 50,
          height: 50,
          image: img,
          draggable: true,
          rotation: 0,
        },
      ]);
    };
  };

  // Remaining return statement and other methods are the same as the original implementation
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1  }}>
            CANVAS
          </Typography>
          <IconButton color="inherit" title="Dashboard">
            <DashboardIcon />
          </IconButton>
          <IconButton color="inherit" title="Reports">
            <AssessmentIcon />
          </IconButton>
          <IconButton color="inherit" title="User Account">
            <AccountCircle />
          </IconButton>
          <Button color="inherit" onClick={handleAddText} style={{fontFamily:"initial"}}>
            Text
          </Button>
          <Button color="inherit" onClick={() => fileInputRef.current.click()} style={{fontFamily:"initial"}}>
            Import Image
          </Button>
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
            <Typography variant="button" style={{ fontSize: "16px" }} style={{fontFamily:"robek"}}>
              Icons
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <h1 >icons</h1>
        <List>
          {["person", "light", "camera"].map((icon) => (
            <ListItem key={icon}>
              <ListItemButton onClick={() => handleAddSvgIcon(icon)}>
                <ListItemText primary={`Add ${icon.charAt(0).toUpperCase() + icon.slice(1)}`} />
              </ListItemButton> 
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight-64}
        style={{ backgroundColor: "#f0f0f0" }}
        onClick={(e) => {
          if (e.target === e.target.getStage()) {
            setSelectedId(null);
          }
        }}
      >
        <Layer>
          {elements.map((el, i) => {
            const props = {
              key: el.id,
              shapeProps: el,
              isSelected: el.id === selectedId,
              onSelect:() => setSelectedId(el.id),
              onChange: (newAttrs) => {
                const items = elements.slice();
                items[i] = newAttrs;
                setElements(items);
              },
            };

            return el.type === "text" ? (
              <EditableText {...props} />
            ) : (
              <EditableImage {...props} />
            );
          })}
        </Layer>
      </Stage>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImportImage}
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

export default App;