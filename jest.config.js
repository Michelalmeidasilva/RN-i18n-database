module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  /*
   * setupFiles: É um array de arquivos que o Jest irá executar antes de executar seus testes na aplicação.
   * Utilizamos essa configuração aqui, para dizer ao jest que carregue o arquivo jestSetup do pacote react-native-gesture-handler para realizar
   * o mock desse módulo.
   */
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)",
  ],
  /*
   * transformIgnorePatterns: É um array de caminhos que o Jest irá ignorar ao transformar o código. Neste caso,
   * é usada uma expressão regular, para dizer ao Jest para transformar cada pacote dentro de node_modules/ que começa com react-native,
   * @react-native-community ou @react-navigation.
   */
};
