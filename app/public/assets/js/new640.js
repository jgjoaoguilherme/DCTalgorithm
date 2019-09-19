var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


var img = new Image();
img.crossOrigin = "Anonymous";
// img.src = 'assets/img/IMG_2031_BW.JPG';
// img.src = 'assets/img/IMG_2031_BW_pure.JPG';
img.src = 'assets/img/IMG_2031_COLOR.JPG';
// img.src = 'assets/img/IMG_2031_pgm.pgm';


function render() 
{
  ctx.drawImage(img, 0, 0);
}

function importImage()
{
  // let out = []
  // for(let i=0; i<2; i++)
  // {
    // for(let j=0; i<2; j++)
    // {
      console.log(ctx.getImageData(0,0, 1, 1));
    // }
  // }
  // console.log(out);
}


const T = 
[[0.3536, 0.3536, 0.3536, 0.3536, 0.3536, 0.3536, 0.3536, 0.3536],
[0.4904, 0.4157, 0.2778, 0.0975, -0.0975, -0.2778, -0.4147, -0.4904],
[0.4619, 0.1913, -0.1913, -0.4619, -0.4619, -0.1913, 0.1913, 0.4619],
[0.4157, -0.0975, -0.4904, -0.2778, 0.2778, 0.4904, 0.0975, -0.4157],
[0.3536, -0.3536, -0.3536, 0.3536, 0.3536, -0.3536, -0.3536, 0.3536],
[0.2778, -0.4904, 0.0975, 0.4157, -0.4157, -0.0975, 0.4904, -0.2778],
[0.1913, -0.4619, 0.4619, -0.1913, -0.1913, 0.4619, -0.4619, 0.1913],
[0.0975, -0.2778, 0.4157, -0.4904, 0.4904, -0.4157, 0.2778, -0.0975]
];


var Original =
[
[154, 123, 123, 123, 123, 123, 123, 136],
[192, 180, 136, 154, 154, 154, 136, 110],
[254, 198, 154, 154, 180, 154, 123, 123],
[239, 180, 136, 180, 180, 166, 123, 123],
[180, 154, 136, 167, 166, 149, 136, 136],
[128, 136, 123, 136, 154, 180, 198, 154],
[123, 105, 110, 149, 136, 136, 180, 166],
[110, 136, 123, 123, 123, 136, 154, 136],
];


// var M = 
// [
// [26, -5, -5, -5, -5, -5, -5, 8],
// [64, 52, 8, 26, 26, 26, 8, -18],
// [126, 70, 26, 26, 52, 26, -5, -5],
// [111, 52, 8, 52, 52, 38, -5, -5],
// [52, 26, 8, 39, 38, 21, 8, 8],
// [0, 8, -5, 8, 26, 52, 70, 26],
// [-5, -23, -18, 2, 8, 8, 52, 38],
// [-18, 8, -5, -5, -5, 8, 26, 8]
// ];



// CRIA MATRIZ QUADRADA DE TAMANHO tam
function createMatrix(tam)
{
  let matrix = [];

  for(let i=0; i<tam; i++)
  {
    let row = [];
    for(let j=0; j<tam; j++)
    {
      row.push(0);
    }
    matrix.push(row);
  }
  return matrix;
}


// CRIA MATRIZ QUADRADA DE TAMANHO tam
function createMatrixDisplay(tam)
{
  let matrix = [];

  for(let i=0; i<tam; i++)
  {
    let row = [];
    for(let j=0; j<tam; j++)
    {
      row.push("i" + i + "j"+j);
    }
    matrix.push(row);
  }
  return matrix;
}



// DIVIDE MATRIX EM BLOCOS 8X8
function splitMatrix(m1)
{
  let out = [];
  let tami=m1.length;
  let flag = true;
  let posi = 0, posj = 0;
  let indexi=0, indexj=0;

  while(flag == true)
  {
    // CRIA BLOCO
    let block = createMatrix(8);
    // PERCORRE MATRIX m1 DA ESQUERDA PARA DIREITA, DE CIMA PARA BAIXO
    for(let i=posi; i<posi+8; i++)
    {
      for(let j=posj; j<posj+8; j++)
      {
        block[indexi][indexj] = m1[i][j];
        indexj++;
      }
      indexi++;
      indexj=0;
    }
    indexi=0;
    posj += 8;

    out.push(block);

    // VERIFICA INDICES
    if(posj == m1.length)
    {
      posi += 8;
      posj = 0;

      if(posi == m1.length) 
        {
          flag = false;
        }
    }
  }
  console.log("Vetor de matrizes 8x8", out);
  return out
}





// MULTIPLICA MATRIZES QUADRADAS
function multiplyMatrix(m1, m2)
{
  let out = createMatrix(m1.length);

  for(let i=0, tami=m1.length; i<tami; i++)
  {
    for(let j=0, tamj=m2.length; j<tamj; j++)
    {
      for(let index=0, tam=m1.length; index<tam; index++)
      {
        out[i][j] +=  m1[i][index] * m2[index][j];
      }
    }
  }
  return out;
}



// RETORNA A TRANSPOSTA DA MATRIX EM QUESTÃO
function transpostMatrix(m1)
{
  let out = createMatrix(m1.length);

  for(let i=0, tami=m1[0].length; i<tami; i++)
  {
    for(let j=0, tamj=m1.length; j<tamj; j++)
    {
      out[j][i] = m1[i][j];
    }
  }
  return out;
}




// SOMA O VALOR num À MATRIX m1
function sumNaturalMatrix(m1, num)
{
  let out = createMatrix(m1.length);
  for(let i=0, tami=m1.length; i<tami; i++)
  {
    for(let j=0, tamj=m1.length; j<tamj; j++)
    {
      out[i][j] = m1[i][j] + num
    }
  }
  return out;
}



function calculateD(mT, mM, mTt)
{
  let out = createMatrix(mT.length);
  out = multiplyMatrix( multiplyMatrix(mT, mM), mTt)

  return out;
}


function calculateN(mTt, R, mT)
{
  let out = createMatrix(mT.length);

  out = multiplyMatrix( multiplyMatrix(mTt, R), mT);

  return out;
}


// ARREDONDA MATRIX 
function roundMatrix(m1)
{
  let out = []
  out = createMatrix(m1.length);

  for(let i=0, tam=m1.length; i<tam; i++)
  {
    for(let j=0; j<tam; j++)
    {
      out[i][j] = Number(m1[i][j].toPrecision(3));
    }
  }

  return out;
}



function ida()
{
  // PADRONIZA MATRIX INICIAL
  let mM = sumNaturalMatrix(Original, -128)
  console.log("Original", Original);
  console.log("Matrix ajustada: ", mM)

  // REALIZA O CALCULO DA RAIZ TRANSPOSTA DE T
  let Tt = transpostMatrix(T);
  console.log("T", T);
  console.log("Transposta de T", Tt);

  // CALCULA D = TMT'
  let D = calculateD(T, mM, Tt);
  console.log("Cálculo D = TMT'", D);

  return D;
}



function volta(mR)
{ 
  let out = createMatrix(mR.length);


  // REALIZA O CALCULO DA RAIZ TRANSPOSTA DE T
  let mTt = transpostMatrix(T);
  console.log("T", T);
  console.log("Transposta de T", mTt);

  // CALCULA D = TMT'
  let N = calculateD(mTt, mR, T);
  console.log("Cálculo N = T'R T", N);

  // SOMA 128 À SAÍDA M
  N = sumNaturalMatrix(N, 128);
  console.log("N somado a 128", N);

  console.log(roundMatrix(N));
  return N
}

window.onload = function () 
{
  render();
  importImage();

  let matrix = createMatrixDisplay(640);
  console.log("Matriz 640 x 640", matrix)
  splitMatrix(matrix);


  // ida();
  volta(ida());

}