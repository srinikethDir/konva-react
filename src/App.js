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
  person:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjQiPjwvY2lyY2xlPjxsaW5lIHgxPSIxMiIgeTE9IjEyIiB4Mj0iMTIiIHkyPSIxNiI+PC9saW5lPjxsaW5lIHgxPSIxMiIgeTE9IjE2IiB4Mj0iMTIuMDEiIHkyPSIxNiI+PC9saW5lPjwvc3ZnPg==",

  light:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0Ij48L2NpcmNsZT48bGluZSB4MT0iMTIiIHkxPSI0IiB4Mj0iMTIiIHkyPSIyIj48L2xpbmU+PGxpbmUgeDE9IjE2IiB5MT0iNiIgeDI9IjE4IiB5Mj0iNSI+PC9saW5lPjxsaW5lIHgxPSI4IiB5MT0iNiIgeDI9IjYiIHkyPSI1Ij48L2xpbmU+PC9zdmc+",

  camera:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIxIiB5PSI2IiB3aWR0aD0iMjIiIGhlaWdodD0iMTQiIHJ4PSIxIj48L3JlY3Q+PHBhdGggZD0iTTUgNiBMOSA0IEgxNCI+PC9wYXRoPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiPjwvY2lyY2xlPjwvc3ZnPg==",

};


const EditableText = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const textRef = useRef();
  const trRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(shapeProps.text);

  const MIN_WIDTH = 20;

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDoubleClick = (e) => {
    setIsEditing(true);

    const stage = e.target.getStage();
    const { x, y } = e.target.getAbsolutePosition();
    const stageBox = stage.container().getBoundingClientRect();

    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);

    textarea.style.position = "absolute";
    textarea.style.top = `${stageBox.top + y}px`;
    textarea.style.left = `${stageBox.left + x}px`;
    textarea.style.width = `${shapeProps.width || 200}px`;
    textarea.style.fontSize = `${shapeProps.fontSize}px`;
    textarea.style.border = "1px solid gray";
    textarea.style.padding = "4px";
    textarea.style.margin = "0";
    textarea.style.overflow = "hidden";
    textarea.style.outline = "none";
    textarea.style.resize = "none";
    textarea.style.lineHeight = "1";
    textarea.style.color = shapeProps.fill || "black";
    textarea.style.background = "white";
    textarea.style.fontFamily = "initial";

    textarea.focus();

    const handleTextareaBlur = () => {
      setIsEditing(false);
      const newText = textarea.value.trim() || "Double-click to edit";
      setText(newText);
      onChange({ ...shapeProps, text: newText });
      document.body.removeChild(textarea);
    };

    textarea.addEventListener("blur", handleTextareaBlur);
  };

  return (
    <>
      <Text
        ref={textRef}
        {...shapeProps}
        text={text}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={handleDoubleClick}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransform={() => {
          const node = textRef.current;
          const newWidth = Math.max(node.width() * node.scaleX(), MIN_WIDTH);

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
      {isSelected && !isEditing && (
        <Transformer
          ref={trRef}
          padding={5}
          enabledAnchors={["middle-left", "middle-right"]}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < MIN_WIDTH) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};


// Separate component for editable image
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

const App = () => {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleAddText = () => {
    setElements([
      ...elements,
      {
        id:`text-${elements.length + 1}`,
        type: "text",
        x: 50,
        y: 50,
        text: "Double-click to edit",
        fontSize: 20,
        draggable: true,
        rotation: 0,
        flipEnabled:false,
      },
    ]);
  };

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
              onSelect: () => setSelectedId(el.id),
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