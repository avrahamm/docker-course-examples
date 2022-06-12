defmodule Main do
  def twice(x) do
    x * 2
  end

  def main do
    IO.puts "Hello World. 2 * 2 = #{twice(2)}"
  end
end

Main.main