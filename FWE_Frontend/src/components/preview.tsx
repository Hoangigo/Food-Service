import { Recipe } from "../model";
const PreviewView: React.FC<{ data: Recipe }> = ({ data }) => {
  const currentid = window.location.hash.slice(1);
  const { id, pictureLink, name } = data;
  return (
    <li className={`preview ${id === currentid ? "preview--active" : ""}`}>
      <a className="preview_link" href={`#${id}`}>
        <figure className="preview_fig">
          <img src={pictureLink} alt={name} />
        </figure>
        <div className="preview_data">
          <h4 className="preview_name">{name}</h4>
        </div>
      </a>
    </li>
  );
};

export default PreviewView;
