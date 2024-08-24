import styles from './BigBlock.module.css';

const BigBlock = ({headText = '', description = '', linkText = 'About', link = '/about'}) => {
  
  if (!headText) {
    headText = 'Hello Med+ AI';
  }
  
  if (!description) {
    description = 'Making medical knowledge accessible in a simple way! ';
  }
  
  return (
    <div className={`container ${styles.customContainer}`}>
      <div className={`row ${styles.customRow}`}>
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <div className={`card ${styles.customCard} rounded-4`}>
            <div className="card-body">
              <h1 className="card-title">{headText}</h1>
              <p className="card-text">
                {description}
                <a href="https://instagram.com/meducationx" target="_blank" rel="noopener noreferrer">@MeducationX</a>
              </p>
              <a href={link} className="btn btn-danger">{linkText}</a>
            </div>
          </div>
        </div>
        <div className={`col-12 col-md-6 d-flex align-items-center justify-content-center ${styles.imageDiv}`}>
          <img src="https://github.com/MeducationX/MeducationX.github.io/blob/main/images/favicon.png?raw=true" alt="MedX-Logo" className={`${styles.image} img-fluid`} />
        </div>
      </div>
    </div>
  );
}

export default BigBlock;